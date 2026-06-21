document.getElementById("pdfFile").addEventListener("change", function(event){

let file = event.target.files[0];


if(file && file.type === "application/pdf"){


let reader = new FileReader();


reader.onload = function(){

let typedarray = new Uint8Array(this.result);


pdfjsLib.getDocument(typedarray).promise.then(function(pdf){


let text = "";


for(let i=1;i<=pdf.numPages;i++){


pdf.getPage(i).then(function(page){


page.getTextContent().then(function(content){


content.items.forEach(function(item){

text += item.str + " ";

});


document.getElementById("resumeText").value = text;


});


});


}


});


}


reader.readAsArrayBuffer(file);


}


});

function analyzeResume(){

let resume = document.getElementById("resumeText").value.toLowerCase();

let score = 0;
let missing = [];


let checks = {
"skills":15,
"education":15,
"projects":15,
"experience":15,
"certificate":10,
"github":5,
"linkedin":5
};


// check normal sections
for(let item in checks){

if(resume.includes(item)){
score += checks[item];
}

else{
missing.push(item);
}

}


// check email separately
if(resume.includes("@")){
score += 5;
}
else{
missing.push("email");
}



document.getElementById("result").innerHTML =

`
<h2>Resume Score: ${score}/100</h2>

<h3>Missing Sections:</h3>

<p>
${missing.length ? missing.join(", ") : "No missing sections 🎉"}
</p>

<h3>Suggestions:</h3>

<p>
${score < 70 
? "Add missing sections to improve your resume."
: "Great resume! Keep improving your skills and achievements."
}
</p>

`;

}