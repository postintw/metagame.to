

function $id(id) {
    return document.getElementById(id);
}

function getLoginInfo() {
    //取回使用者的登入資訊
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        member = JSON.parse(xhr.responseText);
        if (member.MEM_ID) {
            //如果有登入
            // document.getElementById("MEM_NICKNAME").innerText = member.MEM_NICKNAME;
            document.getElementById("spanLogin").innerText = "登出";
        }
    };
    xhr.open("get", "./phps/get_login_info.php", true);
    xhr.send(null);
}

$(document).ready(function () {
    getLoginInfo();
    $(".memicon").click(function () {
        $(".cover").css("display", "flex");
        // console.log("hihi");
    });
    $("#log-in").click(function () {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                //success
                member = JSON.parse(xhr.responseText);
                if (member.MEM_ID) {
                    //如果有回傳一個有會員資料的物件, 表示登入成功
                    $id("spanLogin").innerText = "登出";
                    $id("memName").innerText = member.memName;
                    //將登入表單上的資料清空，並隱藏起來
                    $id("lightBox").style.display = "none";
                    $id("MEM_ID").value = "";
                    $id("MEM_PW").value = "";
                } else {
                    alert("帳密錯誤");
                }
            } else {
                alert(xhr.status);
            }
        };
        xhr.open("post", "./phps/login.php", true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        let data_info = `MEM_ID=${$id("MEM_ID").value}&MEM_PW=${$id("MEM_PW").value}`;
        xhr.send(data_info);
    });
    $(".form")
        .find("input, textarea")
        .on("keyup blur focus", function (e) {
            var $this = $(this),
                label = $this.prev("label");
            if (e.type === "keyup") {
                if ($this.val() === "") {
                    label.removeClass("active highlight");
                } else {
                    label.addClass("active highlight");
                }
            } else if (e.type === "blur") {
                if ($this.val() === "") {
                    label.removeClass("active highlight");
                } else {
                    label.removeClass("highlight");
                }
            } else if (e.type === "focus") {
                if ($this.val() === "") {
                    label.removeClass("highlight");
                } else if ($this.val() !== "") {
                    label.addClass("highlight");
                }
            }
        });
    $(".cancel").click(function () {
        $(".cover").css("display", "none");
    });

    $("p").on("click", function () {
        $("#login").css("display", "none");
        $("#forget_pw").css("display", "block").fadeIn(600);
        $("#signup").css("display", "none");
        $(".tab-group > li").removeClass("active");
    });

    $(".btn.cancel").on("click", function () {
        $(".cover").css("display", "none");
    });
    $(".form")
        .find("input, textarea")
        .on("keyup blur focus", function (e) {
            var $this = $(this),
                label = $this.prev("label");

            if (e.type === "keyup") {
                if ($this.val() === "") {
                    label.removeClass("active highlight");
                } else {
                    label.addClass("active highlight");
                }
            } else if (e.type === "blur") {
                if ($this.val() === "") {
                    label.removeClass("active highlight");
                } else {
                    label.removeClass("highlight");
                }
            } else if (e.type === "focus") {
                if ($this.val() === "") {
                    label.removeClass("highlight");
                } else if ($this.val() !== "") {
                    label.addClass("highlight");
                }
            }
        });

    $(".tab a").on("click", function (e) {
        e.preventDefault();

        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");

        target = $(this).attr("href");

        $(".tab-content > div").not(target).hide();

        $(target).fadeIn(600);
    });
});

// new Vue({
//     el: "#app",
//     data() {
//         return {
//             log_mem_id: "",
//             log_mem_pw: "",
//         };
//     },
//     methods: {
//         mem_register: async function () {
//             const res = await fetch("./php/mem_register.php", {
//                 method: "POST",
//                 mode: "same-origin",
//                 credentials: "same-origin",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     // empName: this.empName,
//                     // empId: this.empId,
//                     // empPsw: this.empPsw,
//                 }),
//             });
//         },
//     },
// });
