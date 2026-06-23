
document
.getElementById("pdfFile")
.addEventListener("change",function(e){


let file=e.target.files[0];


let reader=new FileReader();


reader.onload=function(){


let typedarray=new Uint8Array(this.result);


pdfjsLib
.getDocument(typedarray)
.promise
.then(async function(pdf){


let text="";


for(let i=1;i<=pdf.numPages;i++){


let page=await pdf.getPage(i);


let content=await page.getTextContent();


content.items.forEach(item=>{

text += item.str+" ";

});


}


document
.getElementById("resumeText")
.value=text;



});


}


reader.readAsArrayBuffer(file);


});






function analyzeResume(){



let resume=document
.getElementById("resumeText")
.value
.toLowerCase();



let job=document
.getElementById("jobDesc")
.value
.toLowerCase();



let score=0;



let skills=[

"javascript",
"react",
"html",
"css",
"java",
"python",
"node",
"sql",
"mongodb",
"github",
"git",
"api",
"aws"

];



let foundSkills=[];

let missingSkills=[];



skills.forEach(skill=>{


if(resume.includes(skill)){


score+=5;

foundSkills.push(skill);


}

else{

missingSkills.push(skill);


}


});





let sections=[


"education",
"experience",
"projects",
"certificate",
"linkedin"


];



let missingSections=[];



sections.forEach(section=>{


if(resume.includes(section)){


score+=5;


}

else{


missingSections.push(section);


}


});





let match=0;



if(job.length>0){


skills.forEach(skill=>{


if(job.includes(skill) && resume.includes(skill)){


match+=5;


}


});


}



score=Math.min(score+match,100);





let level;



if(score>=80){

level="🔥 Excellent Resume";

}

else if(score>=60){

level="👍 Good Resume";

}

else{

level="⚠ Needs Improvement";

}






document
.getElementById("result")
.innerHTML=


`

<h2>${level}</h2>


<h1>${score}/100 ATS Score</h1>



<h3>Detected Skills</h3>

<p>

${foundSkills.join(", ")}

</p>




<h3>Missing Skills</h3>

<p>

${missingSkills.join(", ")}

</p>




<h3>Missing Sections</h3>

<p>

${missingSections.join(", ")}

</p>




<h3>AI Suggestions</h3>

<p>

${score<70

?

"Add projects, measurable achievements, GitHub links and required skills."

:

"Your resume looks strong. Improve with better impact statements and keywords."

}


</p>


`;



}