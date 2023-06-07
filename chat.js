const $form = document.querySelector("form");
const $input = document.querySelector("input");
const $chatList = document.querySelector("ul");
const $chatView = document.querySelector(".chat");

// openAI API
let url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

// 질문과 답변 저장
let data = [
    {
        role: "system",
        content: "assistant는 친절한 답변가이다.",
    },
];

// 화면에 뿌려줄 데이터, 질문들
let questionData = [];

// 사용자의 질문
let question;

// input에 입력된 질문 받아오는 함수
$input.addEventListener("input", (e) => {
    question = e.target.value;
    });

// 사용자의 질문을 객체를 만들어서 push
const sendQuestion = (que) => {
    if (que) {
    let Q={
        role: "user",
        content: `${que.trim()}로 만들 수 있는 음식은 뭐가 있나요?`,
        // content: que,
    };
    data.forEach((it, index) => {
        if(it.role === "user"){
            data.splice(index, 1);
        }
    });
    data.push(Q);
    questionData.push(Q);
    }};

// 화면에 질문 그려주는 함수
const printQuestion = async () => {
    if (question){
    // let li = document.createElement("li");
    // li.classList.add("question");

    let p = document.createElement("p");
    p.classList.add("question");

    questionData.map((el) => {
        // li.innerText = el.content;
        // console.log(el.content);
        p.innerText = el.content;
        });

    // $chatList.appendChild(li);
    $chatView.appendChild(p);

    questionData = [];
    question = false;
    }};

// 화면에 답변 그려주는 함수
const printAnswer = (answer) => {
    // let li = document.createElement("li");
    // li.classList.add("answer");

    let p = document.createElement("p");
    p.classList.add("answer");

    // li.innerText = answer;

    p.innerText = answer;

    // $chatList.appendChild(li);

    $chatView.appendChild(p);
};

// api 요청보내는 함수
const apiPost = async () => {
    const result = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        redirect: "follow",
    })
        .then((res) => res.json())
        .then((res) => {
        printAnswer(res.choices[0].message.content);
        })
        .catch((err) => {
        console.log(err);
        });
};

// submit
$form.addEventListener("submit", (e) => {
    e.preventDefault();
    $input.value = null;
    sendQuestion(question);
    apiPost();
    printQuestion();
    console.log(data);
    });
