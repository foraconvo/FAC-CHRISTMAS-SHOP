const app = document.getElementById("app");

let coins = 100;
let total = 0;
let basket = [];

function showShop() {
  app.innerHTML = `
    <section class="shop">
      <p class="eyebrow">✦ SANTA'S LITTLE BAKERY ✦</p>
      <h1>Christmas<br>Market</h1>
      <p class="subtitle">Pick your favourite Christmas treats!</p>

      <div class="coins" id="coins">🎄 100 Christmas Coins</div>

      <div class="products">
        <div class="product">
          <span class="food">🍪</span>
          <h2>Gingerbread</h2>
          <p>20 coins</p>
          <button class="buy" data-name="Gingerbread" data-price="20">ADD TO BASKET</button>
        </div>

        <div class="product">
          <span class="food">🍭</span>
          <h2>Candy Cane</h2>
          <p>15 coins</p>
          <button class="buy" data-name="Candy Cane" data-price="15">ADD TO BASKET</button>
        </div>

        <div class="product">
          <span class="food">🥧</span>
          <h2>Pumpkin Pie</h2>
          <p>30 coins</p>
          <button class="buy" data-name="Pumpkin Pie" data-price="30">ADD TO BASKET</button>
        </div>

        <div class="product">
          <span class="food">☕</span>
          <h2>Hot Chocolate</h2>
          <p>25 coins</p>
          <button class="buy" data-name="Hot Chocolate" data-price="25">ADD TO BASKET</button>
        </div>
      </div>

      <div class="basket">
        <h2>🧺 Your Basket</h2>
        <div id="basketItems">Your basket is empty.</div>
        <p id="total">Total: 0 coins</p>
        <button id="checkout">CONTINUE →</button>
      </div>
    </section>
  `;

  document.querySelectorAll(".buy").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = Number(button.dataset.price);

      if (coins < price) {
        alert("Not enough Christmas Coins!");
        return;
      }

      coins -= price;
      total += price;
      basket.push(name);

      document.getElementById("coins").textContent =
        `🎄 ${coins} Christmas Coins`;

      document.getElementById("basketItems").innerHTML =
        basket.map(item => `<p>🎁 ${item}</p>`).join("");

      document.getElementById("total").textContent =
        `Total: ${total} coins`;
    });
  });

  document.getElementById("checkout").addEventListener("click", () => {
    if (basket.length === 0) {
      alert("Choose your Christmas treats first!");
      return;
    }

    showEditor();
  });
}

function showEditor() {
  app.innerHTML = `
    <section class="editor">
      <p class="eyebrow">✦ SANTA'S WORKSHOP ✦</p>
      <h1>Make Your<br>Christmas Letter</h1>
      <p class="subtitle">A little something made with love.</p>

      <div class="editor-form">
        <label>Your name</label>
        <input id="sender" placeholder="From...">

        <label>Recipient's name</label>
        <input id="receiver" placeholder="To...">

        <label>Your Christmas letter</label>
        <textarea id="letter" maxlength="500"
          placeholder="Write your Christmas wishes here..."></textarea>

<label>📸 Add Your Christmas Memory</label>
<input type="file" id="photoUpload" accept="image/*">
<p class="small-note">Choose a photo from your gallery.</p>

        <label>Choose your paper</label>
        <select id="paper">
          <option value="cream">Vintage Cream</option>
          <option value="pink">Christmas Pink</option>
          <option value="green">Evergreen</option>
          <option value="red">Cranberry Red</option>
        </select>

        <label>Extra decorations</label>
        <div class="decoration-options">
  <button type="button" class="deco" data-deco="🎄">🎄</button>
  <button type="button" class="deco" data-deco="🍬">🍬</button>
  <button type="button" class="deco" data-deco="🧸">🧸</button>
  <button type="button" class="deco" data-deco="🎁">🎁</button>
  <button type="button" class="deco" data-deco="⭐">⭐</button>
  <button type="button" class="deco" data-deco="🔔">🔔</button>
  <button type="button" class="deco" data-deco="🎀">🎀</button>
  <button type="button" class="deco" data-deco="❄️">❄️</button>
  <button type="button" class="deco" data-deco="🕯️">🕯️</button>
</div>
        </div>

        <p class="small-note">Your purchased treats will appear in your scrapbook!</p>
      </div>

      <div class="scrapbook" id="scrapbook">
        <div class="scrap-top">✦ FOR A CONVO PRESENTS ✦</div>
        <div class="scrap-title">Christmas<br>Memories</div>
        <div class="scrap-subtitle">A LITTLE GIFT FROM SANTA</div>

        <div class="scrap-divider">❧ ❄ ❧</div>

        <p class="scrap-to" id="previewTo">To: Someone Special</p>

        <div class="scrap-letter" id="previewLetter">
          May your Christmas be filled with love and magic...
        </div>

<div class="photo-frame">
  <div class="washi-tape"></div>
  <img id="previewPhoto" class="scrap-photo"
  style="display:none;" alt="Your Christmas memory">
</div>

        <p class="scrap-from" id="previewFrom">With love, Santa</p>

        <div class="scrap-divider">✦ ✦ ✦</div>

        <div class="scrap-food" id="previewFood"></div>
        <div class="scrap-deco" id="previewDeco">🎀 ⭐ ❄️</div>

        <div class="scrap-bottom">
          MADE WITH LOVE · CHRISTMAS 2026
        </div>
      </div>

      <button id="download" class="download-btn">
        DOWNLOAD MY SCRAPBOOK ↓
      </button>

      <button id="back" class="back-btn">
        ← BACK TO SHOP
      </button>
    </section>
  `;

  const sender = document.getElementById("sender");
  const receiver = document.getElementById("receiver");
  const letter = document.getElementById("letter");
  const paper = document.getElementById("paper");

  const preview = document.getElementById("scrapbook");

  let uploadedPhoto = null;

document.getElementById("photoUpload").addEventListener("change", function() {
  const file = this.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please choose an image.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(event) {
    const img = new Image();

    img.onload = function() {
      uploadedPhoto = img;

      const previewPhoto = document.getElementById("previewPhoto");
      previewPhoto.src = event.target.result;
      previewPhoto.style.display = "block";
    };

    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
});
  
  const foodEmoji = {
    "Gingerbread": "🍪",
    "Candy Cane": "🍭",
    "Pumpkin Pie": "🥧",
    "Hot Chocolate": "☕"
  };

  document.getElementById("previewFood").textContent =
    basket.map(item => foodEmoji[item]).join("  ");

  function updatePreview() {
    document.getElementById("previewTo").textContent =
      "To: " + (receiver.value || "Someone Special");

    document.getElementById("previewFrom").textContent =
      "With love, " + (sender.value || "Santa");

    document.getElementById("previewLetter").textContent =
      letter.value || "May your Christmas be filled with love and magic...";

    const colors = {
      cream: "#fff5df",
      pink: "#f9e0df",
      green: "#e4eadb",
      red: "#f0d6cd"
    };

    preview.style.background = colors[paper.value];
  }

  [sender, receiver, letter, paper].forEach(input => {
    input.addEventListener("input", updatePreview);
    input.addEventListener("change", updatePreview);
  });

let decorations = [];

document.querySelectorAll(".deco").forEach(button => {
  button.addEventListener("click", () => {
    const deco = button.dataset.deco;

    if (decorations.includes(deco)) {
      decorations = decorations.filter(item => item !== deco);
      button.classList.remove("selected");
    } else {
      decorations.push(deco);
      button.classList.add("selected");
    }

    document.getElementById("previewDeco").textContent =
      decorations.join("  ");
  });
});

  document.getElementById("download").addEventListener("click", () => {
    updatePreview();

    const canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 1500;

    const ctx = canvas.getContext("2d");

    const colors = {
      cream: "#fff5df",
      pink: "#f9e0df",
      green: "#e4eadb",
      red: "#f0d6cd"
    };

    ctx.fillStyle = colors[paper.value];
    ctx.fillRect(0, 0, 1000, 1500);

    ctx.strokeStyle = "#a65b48";
    ctx.lineWidth = 8;
    ctx.strokeRect(35, 35, 930, 1430);

    ctx.strokeStyle = "#c9a17e";
    ctx.lineWidth = 2;
    ctx.strokeRect(55, 55, 890, 1390);

    ctx.textAlign = "center";

    ctx.fillStyle = "#a65b48";
    ctx.font = "bold 24px Georgia";
    ctx.fillText("✦ FOR A CONVO PRESENTS ✦", 500, 130);

    ctx.fillStyle = "#813c32";
    ctx.font = "bold 90px Georgia";
    ctx.fillText("Christmas", 500, 300);
    ctx.fillText("Memories", 500, 405);

    ctx.font = "25px Georgia";
    ctx.fillText("A LITTLE GIFT FROM SANTA", 500, 465);

    ctx.font = "45px Georgia";
    ctx.fillText("❧  ❄  ❧", 500, 560);

    ctx.textAlign = "left";
    ctx.fillStyle = "#813c32";
    ctx.font = "bold 35px Georgia";
    ctx.fillText("To: " + (receiver.value || "Someone Special"), 130, 680);

    ctx.font = "30px Georgia";

    const words = (letter.value ||
      "May your Christmas be filled with love and magic..."
    ).split(" ");

    let line = "";
    let y = 770;

    words.forEach(word => {
      const test = line + word + " ";

      if (ctx.measureText(test).width > 740) {
        ctx.fillText(line, 130, y);
        line = word + " ";
        y += 55;
      } else {
        line = test;
      }
    });

    ctx.fillText(line, 130, y);

    ctx.font = "bold 30px Georgia";

    if (uploadedPhoto) {
  const maxWidth = 300;
  const maxHeight = 180;

  const ratio = Math.min(
    maxWidth / uploadedPhoto.width,
    maxHeight / uploadedPhoto.height
  );

  const width = uploadedPhoto.width * ratio;
  const height = uploadedPhoto.height * ratio;

  ctx.drawImage(
    uploadedPhoto,
    (1000 - width) / 2,
    1070,
    width,
    height
  );
}
    ctx.fillText("With love, " + (sender.value || "Santa"), 130, 1030);

    ctx.textAlign = "center";
    ctx.font = "75px Arial";

    const food = basket.map(item => foodEmoji[item]).join("  ");
    ctx.fillText(food, 500, 1190);

    ctx.font = "55px Arial";
    ctx.fillText(decorations.join("  "), 500, 1300);

    ctx.font = "23px Georgia";
    ctx.fillText("MADE WITH LOVE · CHRISTMAS 2026", 500, 1400);

    const link = document.createElement("a");
    link.download = "FAC-Christmas-Scrapbook.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });

  document.getElementById("back").addEventListener("click", showShop);

  updatePreview();
}

document.getElementById("enterShop").addEventListener("click", showShop);