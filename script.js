fetch("./assets/data/carreira.json")
  .then(res => res.json())
  .then(data => {

    // PERFIL
    document.getElementById("name").textContent = data.profile.name;
    document.getElementById("headline").textContent = data.profile.headline;
    document.getElementById("summary").textContent = data.profile.summary;

    document.getElementById("profile-photo").src = data.profile.photo;

    const contacts = document.getElementById("contact-list");
    data.contacts.forEach(contact => {
      const a = document.createElement("a");
      a.href = contact.url;
      a.textContent = contact.label;
      a.target = "_blank";
      contacts.appendChild(a);
    });

    // CARREIRA
    const career = document.getElementById("career");

    data.careerSteps.forEach(step => {
      const div = document.createElement("div");
      div.className = "career-item";

      div.innerHTML = `
        <h3>${step.title}</h3>
        <p>${step.description}</p>

        <strong>Competências comportamentais</strong>
        <ul>${step.softSkills.map(s => `<li>${s}</li>`).join("")}</ul>

        <strong>Trilha de desenvolvimento</strong>
        <ul>${step.roadmap.map(r => `<li>${r}</li>`).join("")}</ul>
      `;

      career.appendChild(div);
    });

    // PROJETOS
    const projectsDiv = document.getElementById("projects");

    if (data.projects) {
      data.projects.forEach(project => {
        const div = document.createElement("div");

        div.innerHTML = `
          <h3>${project.title}</h3>
          <p>${project.description}</p>

          <strong>Área:</strong> ${project.type}<br>
          <strong>Resultado:</strong> ${project.result}
        `;

        projectsDiv.appendChild(div);
      });
    }

    // HABILIDADES
    const skills = document.getElementById("skills");

    data.skillGroups.forEach(group => {
      const groupDiv = document.createElement("div");

      groupDiv.innerHTML = `<h3>${group.title}</h3>`;

      group.skills.forEach(skill => {
        const skillDiv = document.createElement("div");

        skillDiv.innerHTML = `
          <div>${skill.name}</div>
          <div class="bar">
            <div class="fill" style="width:${skill.level}%"></div>
          </div>
        `;

        groupDiv.appendChild(skillDiv);
      });

      skills.appendChild(groupDiv);
    });

    // OUTRAS SKILLS
    const other = document.getElementById("other-skills");
    data.otherSkills.forEach(s => {
      const li = document.createElement("li");
      li.textContent = s;
      other.appendChild(li);
    });

    // IDIOMAS
    const languages = document.getElementById("languages");
    data.languages.forEach(lang => {
      const li = document.createElement("li");
      li.textContent = `${lang.name} (${lang.level})`;
      languages.appendChild(li);
    });

  })
  .catch(error => {
    console.error("Erro ao carregar JSON:", error);
  });
