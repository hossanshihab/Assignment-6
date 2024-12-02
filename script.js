const loadCategories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await response.json();
  displayCategories(data.categories);
};

const displayCategories = async (data) => {
  const categoriesContainer = document.getElementById("categories");
  categoriesContainer.innerHTML = "";
  console.log(data);
  data.forEach((item) => {
    console.log(item);
    const button = document.createElement("div");
    button.innerHTML = `
  <button onclick="loadCategoryPets('${item.category}')" class="btn  grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 m-5">
      <img 
          class="w-[40px] h-[40px]" 
          src="${item.category_icon}" 
          alt="${item.category}" 
          onerror="this.onerror=null; this.src='./IMAGES/placeholder.png';" /> <!-- Placeholder image -->
      <span>${item.category}</span>
  </button>`;
    categoriesContainer.append(button);
  });
};

const loadCategoryPets = async (categoryName) => {
  // handleLoad()
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  );
  const data = await response.json();
  displayAllPets(data.data);
};

const loadAllPets = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await response.json();
  displayAllPets(data.pets);
  // handleSearch()
};

const displayAllPets = (pets) => {
  const PetsContainer = document.getElementById("allPetsContainer");
  PetsContainer.innerHTML = "";

  if (pets.length === 0) {
    PetsContainer.innerHTML = `"<p>No pets found in this category.</p>"
      <img class=" w-[500px]" src="./IMAGES/error.webp" alt="" />        `;
    return;
  }

  pets.forEach((item) => {
    const card = document.createElement("div");
    card.classList = "card bg-base-100 w-96 shadow-xl p-5 m-10";
    card.innerHTML = `
      <figure>
          <img class="rounded-lg" src=${item.image} alt="${item.pet_name}" />
      </figure>
      <div class="card-body">
          <p class="font-bold text-2xl">Name: ${item.pet_name}</p>
          <h2 class="card-title">Breed: ${
            item.breed || "Not Available"
          }</h2>    
          <p>Date Of Birth: ${
            item.date_of_birth !== null && item.date_of_birth !== undefined
              ? item.date_of_birth
              : "Not Available"
          }</p>
          <p>Price: ${
            item.price >= 100 ? item.price : "Price Not Available"
          }</p>
          <p>Gender: ${
            item.gender !== null && item.gender !== undefined
              ? item.gender
              : "Not Available"
          }</p>
          <p>Vaccinated: ${item.vaccinated_status || "Not Available"}</p>
          <div class="flex justify-center gap-3 items-center">
              <button onclick="likedPets('${
                item.image
              }')" class="btn btn-Accent">          
                  <img src="https://img.icons8.com/?size=24&id=82788&format=png" alt="" />
              </button>
              <button onclick="showCountdownModal()" class="btn">Adopt</button>
              <button onclick="loadPetsDetailsById(${
                item.petId
              })" class="btn">Details</button>
          </div>
      </div>`;
    PetsContainer.append(card);
  });
};

const loadPetsDetailsById = async (petId) => {
  console.log(petId);
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  const data = await response.json();
  console.log(data);
  displayDetails(data.petData);
};

const displayDetails = (pet) => {
  console.log(pet);
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `
      <img class="w-[500px]" src=${pet.image}" alt="${pet.pet_name}" />
  
  <div class="flex justify-evenly font-bold mt-10">
      <br />
     <div>
      <h2 class="font-body">Name: ${pet.pet_name}</h2>
      <p class=" font-body">Breed: ${pet.breed || "Not available"}</p>
      <p class=" font-body">Gender: ${pet.gender}</p>
     </div>
      <div>
      <p class=" font-body">Vaccinated: ${
        pet.vaccinated_status ? "Yes" : "No"
      }</p>
      <p class=" font-body">Price: ${
        pet.price >= 100 ? pet.price : "Not available"
      }</p>
      </div>
  </div>
      <br />
      <br />
      <hr />
      <p class="font-bold font-body">Pet Details: ${pet.pet_details}</p>
  `;
  document.getElementById("showModal").click();
};

const likedPets = (image) => {
  const likedPostContainer = document.getElementById("liked-post");
  const likedPetDiv = document.createElement("div");
  likedPetDiv.classList = "p-2";
  likedPetDiv.innerHTML = `<img src="${image}" alt="Liked Pet" class="w-[150px] h-auto rounded-[20px]"/>`;
  likedPostContainer.appendChild(likedPetDiv);
};

loadCategories();
loadAllPets();
