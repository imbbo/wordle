let l = 5; //사용자가 원하는 단어 길이
let k = 0;
let k2 = 0;
let correct = 0;
let t = 0;
let fc = 0;
let selectedLang = 1;
let flag = false;
var answer;
var hintAnswer;
const $wrap = document.querySelector('.wrap');
const $btn = document.querySelector('button');
const $div = document.querySelector('div.temp');
const $keyboxReset = document.querySelectorAll('.keyboardBox');
const $chanceNum = document.querySelector('.status .tool:first-child em');
const $vic = document.querySelector('.vic');
const $fail = document.querySelector('.fail');





//영어단어 데이터
const eng = [
    'and', 'but', 'cow', //0~2번
    'into', 'rock', 'gift', //3~5번
    'vocal', 'utill', 'hover', //6~8번
    'bottom', 'attack', 'travel', //6~8번
];

const ehints = [
    '그리고', '하지만', '소', //0~2번
    '안으로', '바위', '선물', //3~5번
    '보컬', '활용', '호버', //6~8번
    '맨아래', '공격', '여행', //6~8번
];

const kor = [
    'ㄱㅏㄴ', 'ㅅㅜㄹ', 'ㅍㅏㄹ', // 0~2번
    'ㅎㅏㄹㅜ', 'ㅋㅓㅍㅣ', 'ㅂㅏㄷㅏ', // 3~5번
    'ㅇㅗㅁㅗㄱ', 'ㅌㅏㄹㅈㅜ', 'ㅅㅗㄱㅡㅁ', // 6~8번
    'ㅅㅓㄴㅂㅜㄹ', 'ㄱㅗㅏㅇㅇㅓ', 'ㅁㅏㅇㅜㅅㅡ' // 9~11번
];

const khints = [
    '우루사', '알코올', '발 말고',
    '오늘', '컴포즈', '동해',
    '바둑', '닌자', '설탕',
    '후불', '우럭', '키보드'
];

// 언어 선택
const $sLang = document.querySelector('.sLang');
$sLang.addEventListener('change', e => {

    selectedLang = +$sLang.value;


});


// 글자 수 선택
const $sNum = document.querySelector('.sNum');
$sNum.addEventListener('change', e => {

    l = +$sNum.value;
    k++;
    if (k !== 1) {
        $div.replaceChildren();
        init();
    } else {
        init();

    }

});

function init() {

    const $keyboard = document.querySelector('.keyboard');
    const $keyboardK = document.querySelector('.keyboardK');
    console.log(selectedLang);

    if (selectedLang === 1) {
        $keyboard.classList.remove('hide');
    } else {

        $keyboardK.classList.remove('hide');
        const $kkk = document.querySelectorAll('.keyboardBoxK');
        for (let i = 0; i < 26; i++) {
            $kkk[i].classList.add('.keyboardBox');
        }
    }


    //랜덤단어 선정
    if (l == 3) {
        var ran3 = Math.floor(Math.random() * 3);
        if (selectedLang === 1) {
            const $eng = document.querySelector('.eng');
            $eng.classList.remove('hide');
            answer = eng[ran3];
            hintAnswer = ehints[ran3];
        } else {
            const $kor = document.querySelector('.kor');
            $kor.classList.remove('hide');
            answer = kor[ran3];
            hintAnswer = khints[ran3];
        }


    } else if (l == 4) {
        var ran4 = Math.floor(Math.random() * 3) + 3;
        if (selectedLang === 1) {
            const $eng = document.querySelector('.eng');
            answer = eng[ran4];
            $eng.classList.remove('hide');
            hintAnswer = ehints[ran4];
        } else {
            const $kor = document.querySelector('.kor');
            $kor.classList.remove('hide');
            answer = kor[ran4];
            hintAnswer = khints[ran4];
        }


    } else if (l == 5) {
        var ran5 = Math.floor(Math.random() * 3) + 6;
        if (selectedLang === 1) {
            const $eng = document.querySelector('.eng');
            answer = eng[ran5];
            $eng.classList.remove('hide');
            hintAnswer = ehints[ran5];
        } else {
            const $kor = document.querySelector('.kor');
            $kor.classList.remove('hide');
            answer = kor[ran5];
            hintAnswer = khints[ran5];
        }

    } else if (l == 6) {
        var ran6 = Math.floor(Math.random() * 3) + 9;
        if (selectedLang === 1) {
            const $eng = document.querySelector('.eng');
            answer = eng[ran6];
            $eng.classList.remove('hide');
            hintAnswer = ehints[ran6];
        } else {
            const $kor = document.querySelector('.kor');
            $kor.classList.remove('hide');
            answer = kor[ran6];
            hintAnswer = khints[ran6];
        }

    };
    console.log('정답지 : ' + answer);
    console.log('힌트 : ' + hintAnswer);
    $chanceNum.textContent = answer.length + 2;
    flag = false;



    //글자수대로 초기박스생성
    const $div = document.querySelector('div.temp');


    for (let i = 0; i < answer.length; i++) {
        //input 생성

        const $new = document.createElement('input');

        $new.setAttribute('type', 'text');
        $new.setAttribute('maxlength', '1');
        $new.setAttribute('onkeyup', "moveFocus(" + i + ",event)"); // 키보드이벤트1 추가       
        $new.setAttribute('class', 'list');
        $new.style.backgroundImage = "url('./img/normal.png')";


        $div.appendChild($new);


        //마지막박스 생성 후
        if (i === answer.length - 1) {
            //다음 버튼생성
            const $newbtn = document.createElement('button');
            $newbtn.classList.add('hell');
            $newbtn.textContent = '확인';
            $div.appendChild($newbtn);

            $newbtn.onclick = function (e) {
                const $div = document.querySelector('div.temp');
                if (!e.target.matches('.temp button')) return;
                const $input = $div.querySelectorAll('input');
                check($div, $input);

                if (!flag) creatInput($div);

            };

        }
        $new.style.width = (500 / answer.length) + "px";
        $new.style.height = (500 / answer.length) + "px";


    }
}



//키보드 이벤트1 : 포커스제어===============
function moveFocus(i, event) {
    const $input = document.querySelectorAll('.list');
    if (i == answer.length - 1 && event.key == 'Enter') { //마지막칸 enter 체점 후 다음라인 생성
        const $div = document.querySelector('div.temp');
        check($div, $input);
        if (!flag) creatInput($div);
        $input[i].blur();
        return;
    }

    if (event.keyCode === 27) { //esc 누르면 input 포커스 아웃  
        console.log('eeeeee');
        $input[i].blur();
        console.log('xxxxxxx');
    } else if (!(i == answer.length - 1) && event.keyCode !== 8) {
        if (event.isComposing) return;
        else {
            $input[i + 1].focus();
        }
    }
}



    //글자 채점 로직 함수===============
    function check($div, $input) {
        if (selectedLang == 1) {
            var $keybox = document.querySelectorAll('.keyboardBox');

        } else {
            var $keybox = document.querySelectorAll('.keyboardBoxK');
        }


        for (let i = 0; i < answer.length; i++) {
            if ($input[i].value == answer[i]) {
                //맞는글자 키보드 초록변경

                $input[i].style.backgroundImage = "url('./img/green.png')";
                $input[i].classList.add('greenbox');
                setTimeout(function () {
                    $input[i].classList.remove('greenbox');

                }, 6000);

                for (let j = 0; j < 26; j++) {
                    const keyboxValue = $keybox[j].getAttribute('value');
                    if (keyboxValue === $input[i].value) {
                        if ($keybox[j].classList.contains('yellow')) {
                            $keybox[j].classList.remove('yellow');
                        }
                        $keybox[j].classList.add('green');
                    }
                }
                correct++;
                if (correct == answer.length) { //=============승리 : 초록칸갯수=글자길이==================
                    victory(answer);
                }

            } else if (answer.includes($input[i].value) && $input[i].value !== '') {
                $input[i].style.backgroundImage = "url('./img/yellow.png')";
                $input[i].classList.add('greenbox');


                //맞는글자 키보드 노랑변경
                for (let j = 0; j < 26; j++) {
                    for (let j = 0; j < 26; j++) {
                        const keyboxValue = $keybox[j].getAttribute('value');

                        if (keyboxValue === $input[i].value) {
                            if ($keybox[j].classList.contains('green')) {
                                $keybox[j].classList.remove('yellow');
                            } else {
                                $keybox[j].classList.add('yellow');
                            }
                        }
                    }
                }
            } else {
                //틀린글자 키보드 회색변경
                for (let j = 0; j < 26; j++) {
                    for (let j = 0; j < 26; j++) {
                        const keyboxValue = $keybox[j].getAttribute('value');
                        if (keyboxValue === $input[i].value) {
                            $keybox[j].classList.add('lightgrey');
                        }
                    }
                }
                $input[i].style.backgroundImage = "url('./img/gray.png')";
            }
        }


        t++; //도전횟수 카운트
        if (t == answer.length + 2 && flag == false) {
            flag = true; // 실패해도 맞출때까지 박스 생성하게 해줌
            defeat(answer);
        }
        $chanceNum.textContent = answer.length + 2 - t;
    }


    //다음라인 생성 함수===============
    function creatInput($div) {

        const $inputFocus = document.querySelectorAll('.list');

        for (let i = 0; i < answer.length; i++) {

            $inputFocus[i].classList.remove('list'); //기존 키보드 이벤트1 권한 제거
        }


        const $clone = $div.cloneNode(true);

        $clone.lastChild.onclick = function (e) {
            const $div = document.querySelector('div.temp');
            if (!e.target.matches('.temp button')) return;
            const $input = $div.querySelectorAll('input');
            check($div, $input);

            if (!flag) creatInput($div);

        };

        const $inputs = $clone.querySelectorAll('input');

        for (let $ele of [...$inputs]) {
            $ele.classList.remove('greenbox');
            $ele.style.backgroundImage = "url('./img/normal.png')";

            $ele.value = '';
            // $ele.style.background = 'white';
            $ele.classList.add('list'); //새로운 라인 키보드 이벤트1 권한 부여
        }
        const $btn = document.querySelector('.hell');
        $btn.remove(); //지난라인 버튼제거            
        $wrap.appendChild($clone);
        $div.classList.remove('temp');
        $div.classList.add('remove');

        $inputs[0].focus(); // 생성된 다음라인 첫칸 포커스
        correct = 0; //녹색갯수 초기화
        $wrap.scrollTop = $wrap.scrollHeight; //스크롤 최하단 유지
    }

    function reset() {

        const $remove = document.querySelectorAll('.remove');
        for (let i = 0; i < $remove.length; i++) {
            $remove[i].remove();
        }

        const $rtemp = document.querySelector('.temp');
        $rtemp.replaceChildren();

        if (selectedLang == 1) {
            var $keybox = document.querySelectorAll('.keyboardBox');

        } else {
            var $keybox = document.querySelectorAll('.keyboardBoxK');
        }


        for (let i = 0; i < 26; i++) {
            $keybox[i].classList.remove('green');
            $keybox[i].classList.remove('yellow');
            $keybox[i].classList.remove('lightgrey');
        }
        t = 0;
        correct = 0;
        $hint.classList.remove('hide');
        $hintText.classList.add('hide');


        init();
        const $remov = document.querySelector('.remove');
        $remov.remove();




    }



    //승리시 정답함수===============
    function victory(answer) {

        
        flag = true; // 승리시 추가 라인 생성없음

        //성공단어 사이드로
        const $vpad = document.getElementById('vpad');
        const $sword = document.createElement('div');
        $sword.classList.add('sword');
        $sword.textContent = answer;
        $vpad.appendChild($sword);
        $vic.classList.remove('hide');
        setTimeout(function () {
            $vic.classList.add('hide');

        }, 2000);

        reset();
    };

    function defeat(answer) {
        

        //실패단어 사이드로
        const $dpad = document.getElementById('dpad');
        const $dword = document.createElement('div');
        $dword.classList.add('dword');
        $dword.textContent = answer;
        $dpad.appendChild($dword);
        $fail.classList.remove('hide');
        setTimeout(function () {
            $fail.classList.add('hide');

        }, 2000);
        reset();
    }

    // 상태 창

    // 처음화면 돌아가는 로직
    const $reload = document.querySelector('.status .tool:nth-child(3)');
    $reload.addEventListener('click', e => {
        location.reload();
    });

    // 언어 선택

    // let count = 0;
    // const $selectLang = document.querySelector('.status .tool:nth-child(2)');
    // const $btnRight = document.querySelector('.right');
    // const $btnLeft = document.querySelector('.left');
    // const $eng = document.querySelector('.eng');
    // const $kor = document.querySelector('.kor');
    // $selectLang.addEventListener('click', e => {
    //     count++;
    //     if (!e.target.matches('.right')) return;

    //     if (count === 1) {
    //         $eng.textContent = '';
    //         $kor.textContent = 'Korean';
    //         $div.remove();
    //         selectedLang = 0;
    //         // $tempadd = document.createElement('div');
    //         // $tempadd.classList.add('temp');
    //         // $wrap.appendChild($tempadd);


    //         init();

    //     }
    // });
    // $selectLang.addEventListener('click', e => {
    //     count--;
    //     if (!e.target.matches('.left')) return;
    //     if (count === 0) {
    //         $eng.textContent = 'English';
    //         $kor.textContent = '';
    //         selectedLang = 1;
    //         init();

    //     }
    // });






    // 처음 화면 =============================================================

    const $startPage = document.querySelector('.startPage');
    const $startBtn = document.querySelector('#startBtn');
    const $sbtn2 = document.querySelector('#sbtn2');
    const $intro = document.querySelector('.intro');
    const $introText = document.querySelector('.introText');
    const $select = document.querySelector('.select');
    const $final = document.querySelector('.final');

    $startPage.addEventListener('click', e => {
        if (e.target === $startBtn) {

            const $ka = document.querySelector('#ka');
            const $kb = document.querySelector('#kb');
            const $k1 = document.querySelector('#k1');
            const $k2 = document.querySelector('#k2');

            $ka.style.display = 'block';
            $kb.style.display = 'block';
            setTimeout(function () {
                $startPage.style.display = 'none';
                $select.style.display = 'block';
                $ka.style.display = 'none';
                $kb.style.display = 'none';
                $k1.style.display = 'block';
                $k2.style.display = 'block';

            }, 2000);

        }
    });

    $sbtn2.addEventListener('click', e => {
        if (e.target === $sbtn2) {

            const $kc = document.querySelector('#kc');
            const $kd = document.querySelector('#kd');
            const $k3 = document.querySelector('#k3');
            const $k4 = document.querySelector('#k4');


            $kc.style.display = 'block';
            $kd.style.display = 'block';
            setTimeout(function () {
                $select.style.display = 'none';
                $final.style.display = 'flex';
                $kc.style.display = 'none';
                $kd.style.display = 'none';
                $k3.style.display = 'block';
                $k4.style.display = 'block';

            }, 3000);

        }
    });


    function intros() {
        $introText.style.display = 'block';
    }

    function intros2() {
        $introText.style.display = 'none';
    }




    // 0414 힌트 생성 로직
    const $hint = document.querySelector('.h-title');
    const $hintText = document.querySelector('.h-con');


    $hint.addEventListener('click', e => {
        $hint.classList.toggle('hide');
        $hintText.classList.toggle('hide');
        $hintText.textContent = hintAnswer;
    });

    $hintText.addEventListener('click', e => {
        $hint.classList.toggle('hide');
        $hintText.classList.toggle('hide');
        $hintText.textContent = hintAnswer;
    });