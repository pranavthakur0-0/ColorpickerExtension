const colorpickerbtn = document.querySelector("#color-picker");
const colorList = document.querySelector(".all-colors");
const clearAll = document.querySelector(".clear-all");
const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");
const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`


function copycolor(elem)
{
    navigator.clipboard.writeText(elem.dataset.color);
    elem.innerText = "copied";
    setTimeout(()=> elem.innerText = elem.dataset.color, 1000)
}

const showColor=()=>
{
    colorList.innerHTML = pickedColors.map(color=>`
    <li class="color">
        <span class="rect" style="background:${color}; border : 1px black solid"></span>
        <span class="value" data-color="${color}">${color}</span>
    </li>
    `).join("");

  
    document.querySelectorAll(".color").forEach(li=>{
        li.addEventListener("click", e=>copycolor(e.currentTarget.lastElementChild));
    })
}


const activateEyeDropper = async ()=>
{
    try{
        showColor();
        //Opening the eye dropper and getting the color 
        const EyeDropper = new window.EyeDropper();
        const {sRGBHex} = await EyeDropper.open();
        const code = rgb2hex(sRGBHex);
        navigator.clipboard.writeText(code);

         //Adding the color to list if it's not already present on the list
        if(!pickedColors.includes(code))
        {
            pickedColors.unshift(code);
            localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
            showColor();
        }

    }catch(error){
        console.log(error);
    }
}

colorpickerbtn.addEventListener("click", activateEyeDropper);


const clearAllcolor = ()=>{
    pickedColors.length = 0;
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
    showColor();
}

clearAll.addEventListener("click", clearAllcolor);