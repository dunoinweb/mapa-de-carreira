fetch("./assets/data/carreira.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Erro ao carregar JSON");
    }
    return response.json();
  })
  .then(data => {
    console.log("JSON carregado:", data);

    document.getElementById("name").textContent = data.profile.name;
    document.getElementById("headline").textContent = data.profile.headline;
    document.getElementById("summary").textContent = data.profile.summary;

    const careerDiv = document.getElementById("career");

    data.careerSteps.forEach(step => {
      const block = document.createElement("div");

      block.innerHTML = `
        <h3>${step.title}</h3>
        <p>${step.description}</p>

        <b>Soft Skills:</b>
        <ul>${step.softSkills.map(s => `<li>${s}</li>`).join("")}</ul>

        <b>Roadmap:</b>
        <ul>${step.roadmap.map(r => `<li>${r}</li>`).join("")}</ul>
      `;

      careerDiv.appendChild(block);
    });

    const skillsDiv = document.getElementById("skills");

    data.skillGroups.forEach(group => {
      const div = document.createElement("div");

      div.innerHTML = `
        <h3>${group.title}</h3>
        <ul>
          ${group.skills.map(s => `<li>${s.name} (${s.level}%)</li>`).join("")}
        </ul>
      `;

      skillsDiv.appendChild(div);
    });

    const langList = document.getElementById("languages");

    data.languages.forEach(lang => {
      const li = document.createElement("li");
      li.textContent = `${lang.name} - ${lang.level}`;
      langList.appendChild(li);
    });

  })
  .catch(error => {
    console.error("ERRO:", error);

    document.body.innerHTML += `
      <p style="color:red;">
        ❌ Erro ao carregar JSON. Verifique o caminho do arquivo ou use Live Server.
      </p>
    `;
  });
