//---- FUNCTIONS ----

//leer el payload y fecha de creación y expiración de un token (no usar):
function parseJwt (token) {
        try {
            //si existen puntos en el input, hace un split
            let base64Url = token.split('.')[1];
        
            let base64 = base64Url.replace('-', '+').replace('_', '/');
            let decoded = window.atob(base64); //decodes a string of Base64-encoded data into bytes, and encodes those bytes into a string using Latin-1 (ISO-8859-1).
            
            //devuelve un json con el token parseado
            return JSON.parse(decoded);
            
        } catch (error) {
            //console.log(error) 

            //si hay un error devuelve un undefined
            return undefined
        };      
};


//convierte la fecha de UNIX a Date 
function dateConvertion(unix_time){
	let date = new Date();
	date.setTime(unix_time*1000);
    
	return date;
}


//---- SUBMIT DESCIFRAR TOKEN ----

$("form#token_form").on("submit",()=>{
    //deja el div payload vacío
    $("#payload").text('');

    //toma el valor del input del token
    const token = $("input#token_input").val();
    //toma el valor del input y lo parsea
    const parsedToken = parseJwt(token);

    //si el input no es un token válido, sale una alerta
    if(parsedToken == undefined){
        window.alert('No es un token válido');

    }else{
        //si el input es un token válido, toma cada elemento del token y lo parsea a string para que pueda ser visto en el html
        for(const element in parsedToken){
            const key = element;
            const value = parsedToken[element];

            //muestra y agrega cada key:value al div payload
            $("#payload").append(JSON.stringify(`${key}: ${value}`) + '<br>');
        };

        //$("#payload").text(JSON.stringify(parsedToken));
    };    
});


$("form#unix_time_form").on("submit",()=>{
    //deja el div date vacío
    $("#date").text('');

    try {
        //toma el valor del input de unix_time y lo convierte a int
        const unix_time_input =  $("input#unix_time_input").val();
        const unix_time = parseInt(unix_time_input);

        //
        const dateConverted = dateConvertion(unix_time);

        //muestra y agrega la fecha convertida al div date
        $("#date").append(`Fecha convertida: <br> ${dateConverted.toLocaleString()} (Hora local)`);

    } catch (error) {
        window.alert('No es una fecha válida');
    }   

});



