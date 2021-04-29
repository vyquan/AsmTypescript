import GameController from './controller/GameController'
window.scrollTo(0, 0);
const loginElement: HTMLElement = document.querySelector('#login');
loginElement.addEventListener('click', async (e) => {
    e.preventDefault();
    // console.log('Login');
    const user_name: string = loginElement.parentElement.querySelector('input').value;
    // console.log(user_name);
    const errorElement: HTMLElement = document.querySelector('#login_error');

    if(user_name.trim().length < 3){
        errorElement.textContent = 'Vui lòng nhập tối thiểu 3 kí tự !'
    }else if(user_name.trim().length > 20){
        errorElement.textContent = 'Vui lòng nhập tên không quá 20 kí tự !'      
    } else {    
        loginElement.parentElement.parentElement.classList.add('invisible');
        document.querySelector('#GamePlay').classList.remove('invisible');
        const gameController = new GameController(0, 0, 0, 60, user_name);
        await gameController.renderItem();
        await gameController.afterRender();
        gameController.handlingTime();

        document.querySelector('#resetGame').addEventListener("click", async () => {
        await gameController.renderItem();
        await gameController.afterRender();
        gameController.handlingTime(60);       
        })

        document.querySelector('#cancelGame').addEventListener("click",()=> {
        console.log('cancelGame');
        window.location.reload();
        })
    }
})
