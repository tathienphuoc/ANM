document.getElementsByName("readMore").forEach(function (current) {
  current.addEventListener("click", function () {
    let title = current.parentElement.children[0];
    let text = current.parentElement.children[1];
      if (current.innerHTML === "Read more") {
      title.classList.add("d-inline");
      current.innerHTML = "Read less";
      text.classList.add("d-block");
      text.classList.remove("d-none");
    } else {
      title.classList.remove("d-inline");
      text.classList.add("d-inline");
      current.innerHTML = "Read more";
      text.classList.add("d-none");
      text.classList.remove("d-block");
    }
  });
});
document.getElementsByName("encode-decode").forEach(function (current) {
    current.addEventListener('click', function () {
        let result=null;
        if (current.id === 'encode') {
            result = document.getElementById("decodeInput");
        } else {
            result = document.getElementById("encodeInput");
        }
        result.select();
        result.setSelectionRange(0, 99999); /* For mobile devices */
        /* Copy the text inside the text field */
        document.execCommand("copy");
    })
})
document.getElementById("toast-msg").addEventListener("",function(current){
  current.classList.add("slide");
});