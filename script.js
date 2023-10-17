const signUpbtn=document.getElementsByClassName("sign-btn")['0'];
let error=document.getElementById('error');
let success=document.getElementById('success');
let logOutButton=document.getElementsByClassName('logout-btn')['0'];
let profile=document.getElementsByClassName('profile')['0'];
let signUpPage=document.getElementsByClassName('input-group')['0'];
signUpbtn.addEventListener("click",getUserData);

function getUserData(event)
{
    let fullName=document.getElementById('full-name').value;
    let email=document.getElementById('email').value;
    let password=document.getElementById('password').value;
    let confirmPassword=document.getElementById('confirm-password').value;
    if(fullName && email && password && confirmPassword)
    {
        if(password===confirmPassword)
        {
            error.textContent="";
            let user={fullName,email};
            saveUserData(user);
            success.textContent="Success:Succefully SignedUp"
            setTimeout(displayProfile,1000);
        }
        else{
            success.textContent="";
            error.textContent="Password Mismatching"
        }
       
    }
    else{
        success.textContent="";
        error.textContent="Error:All fields Are Mandatory"
    }
}

function saveUserData(user)
{
    let accessToken=genearateAceessToken();
    localStorage.setItem(accessToken,accessToken);
    localStorage.setItem('user',JSON.stringify(user));
}

// window.addEventListener("load",()=>{
   
//     if(!localStorage.getItem('accessToken'))
//     {
//         signUpPage.style.display='none';
//         profile.style.display='flex';
//     }
//     else{
//         signUpPage.style.display='flex';
//         profile.style.display='none';
//     }
// })

function displayProfile()
{
    let name=document.getElementsByClassName('profile-name')['0'];
    let email=document.getElementsByClassName('profile-email')['0'];
    let data=localStorage.getItem('user');
    let user=JSON.parse(data);
    signUpPage.style.display='none';
    profile.style.display='flex';
    name.textContent="FullName : "+ user.fullName;
    email.textContent="Email :"+ user.email;
}
function genearateAceessToken()
{
    let characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
    let accessToken="";
    for(let i=0;i<16;i++)
    {
        accessToken+=characters.charAt(Math.floor(Math.random()*accessToken.length));
        
    }
    return accessToken;
}

logOutButton.addEventListener("click",logout);
 
function logout(event){
    localStorage.clear();
    signUpPage.style.display='flex';
    profile.style.display='none';
    location.reload()
}

