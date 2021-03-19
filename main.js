// -----------------------------Main---------------------------- -
let elements = {
  key: document.querySelector("#keyInput"),
  plainText: document.querySelector("#encodeInput"),
  cipherText: document.querySelector("#decodeInput"),
  encodeBtn: document.querySelector("#encodeBtn"),
  decodeBtn: document.querySelector("#decodeBtn"),
  option: document.querySelector("#option"),
  about: document.querySelector("#about"),
  readMoreBtnAll: document.getElementsByTagName("a"),
};

let encryptionAlgorithm = {
  Ceasar: {
    errorMessage:
      "=============================Thuật toán Ceasar=============================\n\n" +
      "* Bản rõ không được để trống và chỉ chứa các ký tự từ a-z, A-Z và khoảng trắng.\n" +
      "* Bản mã không được để trống và chỉ chứa các ký tự từ a-z, A-Z và khoảng trắng.\n" +
      "* Khóa không được để trống và là số nguyên từ -1000 đến 1000.",
    encryRules: {
      key: "required|minNumber:-1000|maxNumber:1000",
      plainText: "required|match:^[A-Za-z ]+$",
    },
    decryRules: {
      key: "required|minNumber:-1000|maxNumber:1000",
      cipherText: "required|match:^[A-Za-z ]+$",
    },
    encry: ceasarEncry,
    decry: ceasarDecry,
    about: `Trong mật mã học, Mật mã Caesar (hay còn được gọi là Mật mã của Caesar, Mật mã chuyển vị, Mã của Caesar hay Chuyển vị Caesar) là một trong những kỹ thuật mã hóa đơn giản và phổ biến nhất. Đây là một dạng mật mã thay thế, trong đó mỗi ký tự trên văn bản thô sẽ được thay bằng một ký tự khác, có vị trí cách nó một khoảng xác định trong bảng chữ cái. Ví dụ với độ dịch chuyển là 3, D sẽ trở thành A, E sẽ trở thành B, v.v. Tên của kỹ thuật mã hóa này được đặt theo tên của Julius Caesar, người đã sử dụng nó trong các thư từ bí mật của mình.

Bước mã hóa được thực hiện trong mật mã Caesar thường được kết hợp như một phần của các dạng mã hóa phức tạp hơn, chẳng hạn như mật mã Vigenère, hiện nay vẫn được áp dụng cho mã hóa ROT13. Cũng giống như tất cả các dạng mật mã thay thế một bảng chữ cái khác, mật mã Caesar rất dễ bị phá giải và về cơ bản không đáp ứng đủ khả năng bảo mật thông tin liên lạc trong cuộc sống hiện đại. `,
  },
  Line: {
    errorMessage:
      "=============================Thuật toán Line=============================\n\n" +
      "* Bản rõ không được để trống và chỉ chứa các ký tự từ a-z, A-Z và khoảng trắng.\n" +
      "* Bản mã không được để trống và chỉ chứa các ký tự từ a-z, A-Z và khoảng trắng.\n" +
      "* Khóa không được để trống và là chuỗi ký từ duy nhât từ 0-9.\n" +
      "Thông tin thêm: Kết quả của phép chia độ dài bản mã và độ dài khóa phải là số nguyên.",
    encryRules: {
      key: "required|number|keyLine",
      plainText: "required|match:^[A-Za-z ]+$",
    },
    decryRules: {
      key: "required|number|keyLine",
      cipherText: `required|match:^[A-Za-z ]+$|cipherLine`,
    },
    encry: lineEncry,
    decry: lineDecry,
    about: "Tạm thời chưa có thông tin.",
  },
  Playfair: {
    errorMessage:
      "=============================Thuật toán Playfair=============================\n\n" +
      "* Bản rõ không được để trống và chỉ chứa các ký tự từ a-z và khoảng trắng.\n" +
      "* Bản mã không được để trống và chỉ chứa các ký tự từ a-z và khoảng trắng.\n" +
      "* Khóa không được để trống và chỉ chứa các ký tự từ a-z và khoảng trắng.\n" +
      "Thông tin thêm: Độ dài của bản mã phải là số lẻ.",
    encryRules: {
      key: "required|match:^[a-z ]+$",
      plainText: "required|match:^[a-z ]+$",
    },
    decryRules: {
      key: "required|match:^[a-z ]+$",
      cipherText: `required|match:^[a-z ]+$|cipherPlayfair`,
    },
    encry: playfairEncry,
    decry: playfairDecry,
    about: `Mật mã Playfair là một hệ mã hóa nhiều chữ, giảm bớt tương quan giữa văn bản mã hóa và nguyên bản bằng cách mã hóa đồng thời nhiều chữ cái của nguyên bản. Cơ chế hoạt động như sau: sử dụng một ma trận chữ cái 5x5 trên cơ sở một từ khóa: điền các chữ cái của từ khóa (bỏ các chữ trùng), điền những vị trí còn lại của ma trận với các chữ cái khác của bảng chữ cái; I, J có thể ở trên cùng một ô của ma trận. `,
  },
  Vingenere: {
    errorMessage:
      "=============================Thuật toán Vingenere=============================\n\n" +
      "* Bản rõ không được để trống và chỉ chứa các ký tự từ a-z và A-Z.\n" +
      "* Bản mã không được để trống và chỉ chứa các ký tự từ a-z và A-Z.\n" +
      "* Khóa không được để trống và chỉ chứa các ký tự từ a-z và A-Z.",
    encryRules: {
      key: "required|match:^[A-Za-z]+$",
      plainText: "required|match:^[A-Za-z]+$",
    },
    decryRules: {
      key: "required|match:^[A-Za-z]+$",
      cipherText: `required|match:^[A-Za-z]+$`,
    },
    encry: vingenereEncry,
    decry: vingenereDecry,
    about: `Mật mã Vigenère là một phương pháp mã hóa văn bản bằng cách sử dụng xen kẽ một số phép mã hóa Caesar khác nhau dựa trên các chữ cái của một từ khóa. Nó là một dạng đơn giản của mật mã thay thế dùng nhiều bảng chữ cái. `,
  },
  OneTimePad: {
    errorMessage:
      "=============================Thuật toán OneTimePad=============================\n\n" +
      "* Bản rõ không được để trống và chỉ chứa các ký tự từ a-z, 0-9 và khoảng trắng.\n" +
      "* Bản mã không được để trống.\n" +
      "* Khóa không được để trống và chỉ chứa các ký tự từ a-z, 0-9 và khoảng trắng.\n" +
      "Thông tin thêm: Độ dài của bản rõ phải bằng độ dài của khóa.",
    encryRules: {
      key: "required|match:^[0-9a-z ]+$",
      plainText: "required|match:^[0-9a-z ]+$|plainOneTimePad",
    },
    decryRules: {
      key: "required|match:^[0-9a-z ]+$",
    },
    encry: oneTimePadEncry,
    decry: oneTimePadDecry,
    about: `Mậtmã  One-time-pad  được  đề  xuất  bởi  G. Vernam  (1917);  sau đó  đã  được chứng minh là đảm bảo bí mật tuyệt đối (perfect secretcy -1949). Như tên gọi của nó, trong One-time-padkhóa được viết trên 1 băng (tape) dài, và sử dụng đúng 1 lần. Đồng thời chuỗi khóa là chuỗi văn bản sinh ngẫu nhiên, có độ dài bằng văn bản sử dụng hoặc hơn.`,
  },
};
main();

function main() {
  elements.encodeBtn.addEventListener("click", (e) => {
    run(e.target.id);
  });
  elements.decodeBtn.addEventListener("click", (e) => {
    run(e.target.id);
  });
  renderOptions();
  renderAbout();
  handleBtnReadMore();
}

function run(type) {
  let option = elements.option.value,
    valid;
  if (option) {
    if (type.includes("decode")) {
      addRules(encryptionAlgorithm[option].decryRules);
      valid = new Validator();
      if (valid.getValid()) {
        elements.plainText.value = encryptionAlgorithm[option].decry(
          elements.cipherText.value,
          elements.key.value
        );
        copyToClipboard(elements.plainText);
        displayToastMsg();
      } else {
        alert(encryptionAlgorithm[option].errorMessage);
      }
    } else {
      addRules(encryptionAlgorithm[option].encryRules);
      valid = new Validator();
      if (valid.getValid()) {
        elements.cipherText.value = encryptionAlgorithm[option].encry(
          elements.plainText.value,
          elements.key.value
        );
        copyToClipboard(elements.cipherText);
        displayToastMsg();
      } else {
        alert(encryptionAlgorithm[option].errorMessage);
      }
    }
    removeRules();
  } else {
    alert("Vui lòng chọn thuật toán");
  }
}

function addRules(rules) {
  for (let [key, value] of Object.entries(rules)) {
    elements[key].setAttribute("rules", value);
  }
}

function removeRules() {
  for (let key in elements) {
    elements[key].removeAttribute("rules");
  }
}

function renderOptions() {
  let selector = elements.option,
    opt;
  for (let name in encryptionAlgorithm) {
    opt = document.createElement("option");
    opt.value = name;
    opt.innerHTML = name;
    selector.appendChild(opt);
  }
}
function renderAbout() {
  let selector = elements.about,
    container,
    heading,
    content,
    btn,
    max = 250;
  for (let name in encryptionAlgorithm) {
    let about = encryptionAlgorithm[name].about;
    let lengthContent = about.length;

    container = document.createElement("div");
    container.name = name;

    heading = document.createElement("h2");
    heading.innerText = `${name}:`;
    heading.classList.add("d-inline");

    content = document.createElement("p");
    content.innerHTML =
      lengthContent > max ? `${about.substr(0, max)}... ` : about;
    content.classList.add("d-inline");

    container.appendChild(heading);
    container.appendChild(content);

    if (lengthContent > max) {
      btn = document.createElement("a");
      btn.href = "#";
      btn.innerText = "Xem thêm";
      container.appendChild(btn);
    }
    selector.appendChild(container);
  }
}
function Validator() {
  let validatesFunc = {};
  let elementsHasRule = document.querySelectorAll("[name][rules]");
  let valid = true;
  this.getValid = () => valid;
  // Các rule có sẵn
  let rulesFunc = {
    required: (value, message) => {
      return value
        ? undefined
        : message || "Bạn không được để trống trường này";
    },
    number: (value, message) => {
      return !isNaN(value) ? undefined : message || "Không  phải là số";
    },
    keyLine: () => {
      let temp = [];
      for (let c of elements.key.value) {
        if (temp.includes(c)) {
          return "Đã bị lặp lại";
        }
        temp.push(c);
      }
      return undefined;
    },
    cipherLine: () => {
      let value = elements.cipherText.value.length / elements.key.value.length;
      return value === parseInt(+value, 10) ? undefined : "Không hợp lệ";
    },
    cipherPlayfair: () => {
      return elements.cipherText.value.length % 2 != 0
        ? undefined
        : "Không hợp lệ";
    },
    plainOneTimePad: () => {
      return elements.plainText.value.length === elements.key.value.length
        ? undefined
        : "Không hợp lệ";
    },
    isInt: (value, message) => {
      return +value === parseInt(+value, 10)
        ? undefined
        : message || "Không phải là số";
    },
    minNumber: (min) => {
      return (value, message) => {
        return +value >= +min ? undefined : message || `Tối thiểu ${min}`;
      };
    },
    maxNumber: (max) => {
      return (value, message) => {
        return +value <= +max ? undefined : message || `Tối đa ${max}`;
      };
    },
    match: (regex) => {
      return (value, message) => {
        regex = new RegExp(regex);
        return regex.test(value) ? undefined : message || "Không hợp lệ";
      };
    },
  };

  // Tạo validatesFunc
  elementsHasRule.forEach((element) => {
    // Mảng các rule
    let rules = element.getAttribute("rules").split("|");
    rules.forEach((rule) => {
      let isRuleHasValue = rule.includes(":"),
        ruleInfo = rule.split(":"),
        ruleFunc = rulesFunc[rule];
      // Nếu rule có giá trị theo sau
      if (isRuleHasValue) {
        //Lấy tên rule
        rule = ruleInfo[0];
        //Truyền giá trị cho rule có giá trị theo sau
        //Kết quả trả về làm môt function như rule kh có giá trị theo sau
        ruleFunc = rulesFunc[rule](ruleInfo[1]);
      }

      if (Array.isArray(validatesFunc[element.name])) {
        validatesFunc[element.name].push(ruleFunc);
      } else {
        validatesFunc[element.name] = [ruleFunc];
      }
    });
  });

  elementsHasRule.forEach((element) => {
    let validates = validatesFunc[element.name];
    validates.forEach((validate) => {
      let message = validate(element.value);
      if (message) {
        valid = false;
      }
    });
  });
}
function handleBtnReadMore() {
  for (let btn of elements.readMoreBtnAll) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      let parentElement = btn.parentElement;
      let content = parentElement.querySelector("p");
      content.innerText = encryptionAlgorithm[parentElement.name].about;
      btn.remove();
    });
  }
}
function copyToClipboard(element) {
  element.select();
  element.setSelectionRange(0, 99999); /* For mobile devices */
  /* Copy the text inside the text field */
  document.execCommand("copy");
}

function displayToastMsg() {
  let toastMsg = document.createElement("div");
  toastMsg.classList.add("toast-msg");
  toastMsg.id = "toast-msg";
  toastMsg.innerHTML = `<div class="icon">
      <i class="fas fa-check-circle"></i>
    </div>
    <div class="content">Sao chép kết quả</div>`;

  document.body.appendChild(toastMsg);
}

function ceasarEncry(text, key) {
  let cipher = "";
  let k = readCeasarKey(key);
  let words = [];
  words = sliceString(text);
  for (let i = 0; i < words.length; i++) {
    let tmp = [];
    tmp = sliceWord(words[i]);
    for (let j = 0; j < tmp.length; j++) {
      cipher += rightShift(tmp[j], k);
    }
    cipher += " ";
  }
  return cipher;
}

function ceasarDecry(text, key) {
  let plain = "";
  let words = [];
  words = sliceString(text);
  let k = readCeasarKey(key);
  for (let i = 0; i < words.length; i++) {
    let tmp = [];
    tmp = sliceWord(words[i]);
    for (let j = 0; j < tmp.length; j++) {
      plain += leftShift(tmp[j], k);
    }
    plain += " ";
  }
  return plain;
}

//Dich Char sang phai theo bang ma ascii
function rightShift(char, value) {
  let i = char.charCodeAt(0);
  if (i + value > 122) return String.fromCharCode(i + value - 26);
  else return String.fromCharCode(i + value);
}

//Dich Char sang trai theo bang ma ascii
function leftShift(char, value) {
  let i = char.charCodeAt(0);
  if (i - value < 97) return String.fromCharCode(i - value + 26);
  else return String.fromCharCode(i - value);
}

//Chuyen word thanh chars
function sliceWord(wrd) {
  let s = [];
  s = wrd.split("");
  return s;
}

//Chuyen string thanh words
function sliceString(str) {
  let s = [];
  s = str.split(" ");
  return s;
}

function readCeasarKey(key) {
  return parseInt(key) % 26;
}

function lineDecry(text, key) {
  let plain = "";
  let cipher = [];
  cipher = readLineText(text);
  let k = [];
  k = readLineText(key);
  // cols la so cot, tuong ung voi chieu dai key
  // rows la so dong, tuong duong voi text / key
  let cols = k.length;
  let rows = cipher.length / k.length;
  // table co n=rows dong
  let table = new Array(rows);
  // cac dong co chieu dai bang cols=key.length
  for (let i = 0; i < table.length; i++) {
    table[i] = new Array(cols);
  }
  //ghep gia tri cua cipher text vao mang tam
  let piece = [];
  let pieceLength = rows;
  for (let i = 0; i < cols; i++) {
    piece[i] = new Array();
  }
  for (let i = 0; i < cols; i++) {
    piece[i] = get(cipher, i * pieceLength, i * pieceLength + pieceLength);
  }
  //nap gia tri mang tam vao table
  let begin = 0;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < cols; j++) {
      if (i == parseInt(k[j])) {
        for (let x = 0; x < rows; x++) {
          table[x][j] = piece[begin][x];
        }
        begin++;
        break;
      }
    }
  }
  //nap gia tri cua table vao plaintext
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      plain += table[i][j];
    }
  }
  return plain;
}

function lineEncry(text, key) {
  let cipher = "";
  let plain = [];
  plain = readLineText(text);
  let k = [];
  k = readLineText(key);
  // cols la so cot, tuong ung voi chieu dai key
  // rows la so dong, tuong duong voi text / key
  plain = generate(plain, k.length - (plain.length % k.length));
  let cols = k.length;
  let rows = plain.length / k.length;
  // table co n=rows dong
  let table = new Array(rows);
  // cac dong co chieu dai bang cols=key.length
  for (let i = 0; i < table.length; i++) {
    table[i] = new Array(cols);
  }
  //ghep gia tri cua plain text vao table
  let t = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      table[i][j] = plain[t++];
    }
  }
  //tach table thanh tung cot roi nap vao bien cipher
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < k.length; j++) {
      if (i == parseInt(k[j])) {
        for (let x = 0; x < rows; x++) {
          cipher += table[x][j];
        }
        break;
      }
    }
  }
  return cipher;
}

function get(text, start, end) {
  let s = [];
  for (let i = start; i < end; i++) s.push(text[i]);
  return s;
}
function generate(text, count) {
  for (let i = 0; i < count; i++) {
    text.push(
      String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97)
    );
  }
  return text;
}

// Tra ve tat ca cac ky tu trong text
function readLineText(text) {
  let txt = "";
  txt = text.replaceAll(" ", "");
  let tmp = [];
  tmp = txt.split("");
  return tmp;
}
function readLineKey(key) {
  let k = [];
  k = key.split("");
}
function isValidLineKey(key) {
  if (isNaN(key)) return false;
  let k = [];
  k = key.split("");
  if (k.length > 10) return false;
  for (let i = 0; i < k.length; i++) {
    for (let j = i + 1; j < k.length; j++) {
      if (k[i] == k[j]) return false;
    }
  }
  return true;
}

// 0. Key, ciphertext, plaintext khi truyền vào hàm phải là String

// 1. Key chỉ nhận giá trị a-z và khoảng trắng, không giới hạn chiều dài (regex pattern: /^[a-z\s]+$/ )

// 2. plaintext truyền vào hàm playfairEncry chỉ bao gồm a-z và khoảng trắng (regex pattern: /^[a-z\s]+$/ )

// 3. ciphertext truyền vào hàm playfairDecry phải có chiều dài là số lẻ

// 4. ciphertext truyền vào hàm playfairDrcry chỉ bao gồm a-z và khoảng trắng (regex pattern: /^[a-z\s]+$/ )

function playfairEncry(plaintext, key) {
  var ciphertext = "";

  var keymatrix = createKeymatrix(key);

  var filtertext = createFiltertext(plaintext);

  var words = [];
  words = filtertext.split(" ");

  for (var i = 0; i < words.length; i++) {
    ciphertext += sub(keymatrix, words[i]);
    if (i < words.length - 1) {
      ciphertext += " ";
    }
  }

  return ciphertext;
}

function playfairDecry(ciphertext, key) {
  var plaintext = "";

  var keymatrix = createKeymatrix(key);

  var words = [];
  words = ciphertext.split(" ");
  for (var i = 0; i < words.length; i++) {
    plaintext += deSub(keymatrix, words[i]);
    if (i < words.length - 1) {
      plaintext += " ";
    }
  }
  return purgePlaintext(plaintext);
}

function purgePlaintext(ciphertext) {
  let purgetext = "";

  let words = [];
  words = ciphertext.split(" ");

  for (let i = 0; i < words.length; i++) {
    if (words[i].charAt(words[i].length - 1) == "q") {
      purgetext += words[i].slice(0, -1);

      if (i < words.length - 1) {
        purgetext += " ";
      }
    } else {
      purgetext += words[i];

      if (i < words.length - 1) {
        purgetext += " ";
      }
    }
  }

  return purgetext;
}

function deSub(keymatrix, word) {
  let newWord = "";

  let ch = [];
  ch = word.split("");

  let char_1_pos_col = 0;

  let char_1_pos_row = 0;

  let char_2_pos_col = 0;

  let char_2_pos_row = 0;

  for (let i = 0; i < ch.length; i += 2) {
    for (let j = 0; j < 5; j++) {
      for (let k = 0; k < 5; k++) {
        if (ch[i] == keymatrix[j][k]) {
          char_1_pos_col = k;
          char_1_pos_row = j;
        }

        if (ch[i + 1] == keymatrix[j][k]) {
          char_2_pos_col = k;
          char_2_pos_row = j;
        }
      }
    }

    if (char_1_pos_row == char_2_pos_row) {
      newWord += deRollRow(
        char_1_pos_row,
        char_1_pos_col,
        char_2_pos_col,
        keymatrix
      );
      continue;
    }
    if (char_1_pos_col == char_2_pos_col) {
      newWord += deRollCol(
        char_1_pos_col,
        char_1_pos_row,
        char_2_pos_row,
        keymatrix
      );
      continue;
    }
    newWord += deRollFree(
      char_1_pos_row,
      char_1_pos_col,
      char_2_pos_row,
      char_2_pos_col,
      keymatrix
    );
  }
  return newWord;
}

function sub(keymatrix, word) {
  let newWord = "";

  let ch = [];
  ch = word.split("");

  let char_1_pos_col = 0;

  let char_1_pos_row = 0;

  let char_2_pos_col = 0;

  let char_2_pos_row = 0;

  for (let i = 0; i < ch.length; i += 2) {
    for (let j = 0; j < 5; j++) {
      for (let k = 0; k < 5; k++) {
        if (ch[i] == keymatrix[j][k]) {
          char_1_pos_col = k;
          char_1_pos_row = j;
        }

        if (ch[i + 1] == keymatrix[j][k]) {
          char_2_pos_col = k;
          char_2_pos_row = j;
        }
      }
    }

    if (char_1_pos_row == char_2_pos_row) {
      newWord += rollRow(
        char_1_pos_row,
        char_1_pos_col,
        char_2_pos_col,
        keymatrix
      );
      continue;
    }
    if (char_1_pos_col == char_2_pos_col) {
      newWord += rollCol(
        char_1_pos_col,
        char_1_pos_row,
        char_2_pos_row,
        keymatrix
      );
      continue;
    }
    newWord += rollFree(
      char_1_pos_row,
      char_1_pos_col,
      char_2_pos_row,
      char_2_pos_col,
      keymatrix
    );
  }
  return newWord;
}

function rollRow(a, b, c, keymatrix) {
  let tmp = "";
  if (b == 4) b = -1;
  if (c == 4) c = -1;
  tmp = tmp + keymatrix[a][b + 1] + keymatrix[a][c + 1];
  return tmp;
}
function deRollRow(a, b, c, keymatrix) {
  let tmp = "";
  if (b == 0) b = 5;
  if (c == 0) c = 5;
  tmp = tmp + keymatrix[a][b - 1] + keymatrix[a][c - 1];
  return tmp;
}

function rollCol(a, b, c, keymatrix) {
  let tmp = "";
  if (b == 4) b = -1;
  if (c == 4) b = -1;
  tmp = tmp + keymatrix[b + 1][a] + keymatrix[c + 1][a];
  return tmp;
}
function deRollCol(a, b, c, keymatrix) {
  let tmp = "";
  if (b == 0) b = 5;
  if (c == 0) b = 5;
  tmp = tmp + keymatrix[b - 1][a] + keymatrix[c - 1][a];
  return tmp;
}

function rollFree(a, b, c, d, keymatrix) {
  let tmp = "";
  return (tmp = tmp + keymatrix[a][d] + keymatrix[c][b]);
}

function deRollFree(a, b, c, d, keymatrix) {
  let tmp = "";
  return (tmp = tmp + keymatrix[a][d] + keymatrix[c][b]);
}

function createFiltertext(plaintext) {
  let filtertext = "";

  let words = plaintext.split(" ");

  for (let i = 0; i < words.length; i++) {
    filtertext += fil(words[i]);
    if (i < words.length - 1) {
      filtertext += " ";
    }
  }
  return filtertext;
}

function fil(word) {
  if (word.length % 2 != 0) {
    word += "q";
  }

  return word;
}

function createKeymatrix(key) {
  // get everything prepared

  let keymatrix = []; // 5x5 matrix

  for (let i = 0; i < 5; i++) {
    keymatrix[i] = new Array(5);
  }
  let tmpKey = key.replaceAll(" ", "");
  tmpKey = tmpKey.split("");

  let isExist = false;

  let posRow = 0; // current position of the empty value

  let posCol = 0;

  let alphabet = [];

  for (let i = 0; i < 9; i++) {
    alphabet[i] = String.fromCharCode(i + 97);
  }

  for (let i = 9; i < 25; i++) {
    alphabet[i] = String.fromCharCode(i + 98);
  }

  // for-each char : key, if current char has not appeared in keymatrix yet, place it in the current position

  for (let i = 0; i < tmpKey.length; i++) {
    isExist = false;

    for (let j = 0; j < 5; j++) {
      for (let k = 0; k < 5; k++) {
        if (tmpKey[i] == keymatrix[j][k]) {
          isExist = true;
          break;
        }
      }
      if (isExist) break;
    }
    if (isExist) continue;
    else {
      keymatrix[posRow][posCol] = tmpKey[i];
      posCol++;
      if (posCol > 4) {
        posCol = 0;
        posRow++;
      }
    }
  }

  // for each char in alphabet, if it does not appear in keymatrix, place it in the current position

  for (let i = 0; i < 25; i++) {
    isExist = false;

    for (let j = 0; j < 5; j++) {
      for (let k = 0; k < 5; k++) {
        if (alphabet[i] == keymatrix[j][k]) {
          isExist = true;
          break;
        }
      }

      if (isExist) break;
    }

    if (isExist) continue;
    else {
      keymatrix[posRow][posCol] = alphabet[i];
      posCol++;
      if (posCol > 4) {
        posCol = 0;
        posRow++;
      }
    }
  }

  return keymatrix;
}

/*Method này dùng để mở rộng key 
    Qui tắc của key là sẽ kéo độ dài cho bằng độ dài plaintext / ciphertext
    VD: plaintext=iloveu, key=m thì lúc này key sẽ tự mở rộng thành mmmmmm để có thể thực hiện encode.
    Cách tạo ra ciphertext là tạo ra Columm==plaintext và Row==Key với độ dài là 26 kí tự,
    Sau đó ta sẽ tìm ra vị trí giao nhau-> đó là ciphertext. Cứ thế làm với các kí tự tiếp theo
    */
function isLetter(string) {
  return /[a-zA-Z]/i.test(string);
}
function KeyExpanding(msg, key) {
  let result = "";
  let i = 0;
  while (i < msg.length) {
    result += key[i % key.length]; // Lấy kí tự thứ i .(trong trường hợp i dài --> mod độ dài khóa.)
    i++;
  }
  return result;
}

function vingenereEncry(message, key) {
  let result = "";

  for (let i = 0, j = 0; i < message.length; i++) {
    let c = message[i];
    if (isLetter(c)) {
      if (c == c.toUpperCase()) {
        result += String.fromCharCode(
          ((c.charCodeAt(0) +
            key.toUpperCase().charCodeAt(j) -
            2 * "A".charCodeAt(0)) %
            26) +
            "A".charCodeAt(0)
        );
      } else {
        result += String.fromCharCode(
          ((c.charCodeAt(0) +
            key.toLowerCase().charCodeAt(j) -
            2 * "a".charCodeAt(0)) %
            26) +
            "a".charCodeAt(0)
        );
      }
    } else {
      result += String.fromCharCode(c);
    }
    j = 1+j % key.length;
  }
  return result;
}

function vingenereDecry(message, key) {
  let result = "";

        for (let i = 0, j = 0; i < message.length; i++) {

            let c = message[i];
            if (isLetter(c)) {
                if (c == c.toUpperCase()) {
                  result += String.fromCharCode(
                    "Z".charCodeAt(0) -
                      ((25 - (c.charCodeAt(0) - key.toUpperCase().charCodeAt(j))) %
                        26)
                  );
                } else {
                  result += String.fromCharCode(
                    "z".charCodeAt(0) -
                      ((25 - (c.charCodeAt(0) - key.toLowerCase().charCodeAt(j))) %
                        26)
                  );
                }
            } else {
                result += String.fromCharCode(c);
            }

            j = 1+j % key.length;
        }
        return result;
}

function oneTimePadEncry(plainText, key) {
  let t = 0;
  let cipherText = "";

  for (let i = 0; i < plainText.length; i++) {
    t = plainText.charCodeAt(i) + key.charCodeAt(i);

    cipherText += String.fromCharCode(t);
  }
  return cipherText;
}

function oneTimePadDecry(cipherText, key) {
  let plainText = "";

  let t = 0;

  for (let i = 0; i < cipherText.length; i++) {
    t = cipherText.charCodeAt(i) - key.charCodeAt(i);

    plainText += String.fromCharCode(t);
  }

  return plainText;
}
