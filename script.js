const select=document.querySelectorAll(".dropdown select");
let mess=document.querySelector(".message p")
let btn=document.querySelector(".message button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
for(let dropdowns of select)
{
    for(let code in countryList)
    {
        let newOp=document.createElement("option");
        newOp.innerText=code;
        newOp.value=code;
        if(dropdowns.name==="from" && code==="USD")
        newOp.selected="selected";
        else if(dropdowns.name==="to" && code==="INR")
        newOp.selected="selected";
        dropdowns.append(newOp);   
    }
    dropdowns.addEventListener("change",(evt)=>{
        changeFlag(evt.target);
    })
}
const changeFlag=(element)=>{
    let currCode=element.value; // .value refers to present selected value. 
    currCode.selected="selected";
    let countryCode=countryList[currCode];
    let flag=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=flag;
}
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amt=amount.value;
    if(amt==="" || amt<=0)
    {
        amt=1;
        amount.value="1";
    }
    let URL=`https://v6.exchangerate-api.com/v6/b9bb9507d427669d5f4507d6/latest/${fromCurr.value}`;
    mess.innerText="Getting exchange rate ......."
    await fetch(URL).then(response => response.json()).then(result => {
        let exchangerate = result.conversion_rates;
        let rate=exchangerate[toCurr.value];
        mess.innerText=`${amount.value} ${fromCurr.value} = ${rate*amount.value} ${toCurr.value}`
    });
})

