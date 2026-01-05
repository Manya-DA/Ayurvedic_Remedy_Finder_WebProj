const HUGGINGFACE_API_TOKEN = "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";
const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2";

document.getElementById('searchBtn').addEventListener('click', searchRemedy);

document.getElementById('symptomInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchRemedy();
});

async function searchRemedy() {
  const symptom = document.getElementById('symptomInput').value.trim();
  const resultArea = document.getElementById('resultArea');

  if (!symptom) {
    resultArea.innerHTML = `<p class="text-red-600 text-center text-lg font-semibold">⚠️ Please enter a symptom!</p>`;
    return;
  }

  resultArea.innerHTML = `
    <div class="flex flex-col items-center justify-center space-y-4">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
      <p class="text-center text-gray-600 text-lg">Searching remedies for "<strong class="text-green-700">${symptom}</strong>"...</p>
    </div>
  `;

  try {
    const res = await fetch(`search_remedy.php?symptom=${encodeURIComponent(symptom)}`);
    const data = await res.json();

    if (data.error) {
      resultArea.innerHTML = `
        <div class="text-center">
          <p class="text-red-600 text-xl font-semibold">❌ No remedy found for "${symptom}"</p>
          <p class="text-gray-500 mt-2">Try searching for: cold, headache, cough, fever, indigestion</p>
        </div>
      `;
      return;
    }

    let html = '<div class="space-y-8">';
    
    for (let remedy of data) {
      const wikiInfo = await fetchHerbInfo(remedy.herbs);
      const aiInsight = await askHuggingFace(remedy.herbs, symptom);

      html += `
  <div class="border-2 border-green-200 rounded-2xl p-6 shadow-xl bg-gradient-to-br from-green-50 to-white hover:shadow-2xl transition">
    <h2 class="text-3xl font-bold text-green-700 mb-3">🌿 ${remedy.remedy_name}</h2>
    <p class="text-lg"><strong class="text-green-600">Herbs:</strong> ${remedy.herbs}</p>
    <p class="mt-3 text-gray-700 leading-relaxed">${remedy.description}</p>
    
${remedy.image_url 
  ? `<img src="${remedy.image_url}" alt="${remedy.remedy_name}" class="mt-5 rounded-xl shadow-lg mx-auto max-w-md w-full object-cover">` 
  : ''
}
    <div class="mt-6 p-5 bg-green-100 rounded-xl shadow-inner space-y-4">
      ${wikiInfo}
      <div class="border-top-2 border-green-200 pt-4">
        <h3 class="font-bold text-green-800 text-lg flex items-center gap-2">
          🤖 AI-Generated Insight
        </h3>
        <p class="text-gray-700 mt-2 leading-relaxed">${aiInsight}</p>
      </div>
    </div>
  </div>
`;

    }
    
    html += '</div>';
    resultArea.innerHTML = html;

  } catch (err) {
    console.error('Error:', err);
    resultArea.innerHTML = '<p class="text-red-600 text-center text-lg">⚠️ Error fetching remedy information. Please try again.</p>';
  }
}

async function fetchHerbInfo(herbs) {
  const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(herbs)}`;
  
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error('Wikipedia API error');
    const data = await res.json();
    
    return `
      <div>
        <h3 class="font-bold text-green-800 text-lg flex items-center gap-2">
          📚 About ${herbs}
        </h3>
        <p class="text-gray-700 mt-2 leading-relaxed">${data.extract || 'No information found on Wikipedia.'}</p>
        ${data.thumbnail ? `<img src="${data.thumbnail.source}" alt="${herbs}" class="w-40 mx-auto rounded-lg mt-3 shadow-md"/>` : ''}
      </div>
    `;
  } catch {
    return `<p class="text-gray-500 italic">📚 No additional information available about ${herbs}.</p>`;
  }
}

async function askHuggingFace(herb, symptom) {
  try {
    const response = await fetch(HUGGINGFACE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUGGINGFACE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: {
          question: `How does ${herb} help treat ${symptom}?`,
          context: `${herb} is an Ayurvedic herb known for its medicinal properties. It has been traditionally used in Ayurvedic
           medicine to treat various ailments including ${symptom}. The herb contains natural compounds that provide therapeutic benefits.`
        }
      })
    });

    const data = await response.json();
    
    if (data.answer) {
      return data.answer;
    } else if (data.error) {
      return `AI model is currently loading. ${herb} is traditionally used in Ayurveda for treating ${symptom} due to its natural 
      healing properties.`;
    } else {
      return `${herb} has been used in traditional Ayurvedic medicine for centuries to help alleviate symptoms of ${symptom}.`;
    }
  } catch (error) {
    console.error("Hugging Face API error:", error);
    return `${herb} is a well-known Ayurvedic herb traditionally used for treating ${symptom}.`;
  }
}
