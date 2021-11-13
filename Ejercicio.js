
var scene = new THREE.Scene();
wireframe: false

function cubo(x, y, z, color, material, alambrado)
{
    var cubeGeometry = new THREE.BoxGeometry(x, y, z);
    var cubeMaterial;
    switch(material)
    {

     case 'Basic': cubeMaterial = new THREE.MeshBasicMaterial({color: color, wireframe: alambrado});
      break;

     case 'Standard': cubeMaterial = new THREE.MeshStandardMaterial({color: color, wireframe: alambrado});
      break;

     case 'Physical': cubeMaterial = new THREE.MeshPhysicalMaterial({color: color, wireframe: alambrado});
      break;

     case 'Phong': cubeMaterial = new THREE.MeshPhongMaterial({color: color, wireframe: alambrado});
      break;

     case 'Lambert': cubeMaterial = new THREE.MeshLambertMaterial({color: color, wireframe: alambrado});
      break;
    }
    
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    
    scene.add(cube);
    return(cube);
}
function init()

 {
    var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);

    
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);

   
    var axes = new THREE.AxesHelper(400);
    scene.add(axes);

    Cubo = [];   // Define un array unidimensional para contener los cubos

   
    //Dim=16; //Valor la inicial del cubo

    Dim = prompt("Digite el tamaño que desea para el cubo", " ejemplo. 25");////Este cuadro de texto permitira que el usuario digite el tamaño desado del cubo
    if(Dim != null)//Cuando el usuario digite el numero, le saltara una alerta dependiendo de que haya digitado
    {
    alert("Su numero es "+ Dim);
    }   
    else 
    {
    alert("No has escrito nada");
    }

    Angulo = prompt("Digite el ángulo que desea en grados", " ejemplo. 25");//Este cuadro de texto le permitira al ususario digitar el andulo en grados por el cual el cubo rotara
    if(Angulo != null)//Cuando el usuario digite el numero, le saltara una alerta dependiendo de que haya digitado
    {
    alert("Su numero es "+ Angulo);
    }   
    else 
    {
    alert("No has escrito nada");
    }

    Delta= Dim/2;//Valor el lado inicial del cubo dividido en 2
    Diagonal=Math.sqrt(Math.pow(Delta,2)+Math.pow (Delta,2));//La diagonal nos ayuda a encontrar la longitud del centro del cubo, hacia el punto medio
    //Angulo=Math.PI/16;//el angulo de rotacion del cubo
    Radianes=(Angulo)*((2*Math.PI)/(360));//Esta variable se usa para convertir de grados a radianes
    NewDelta=(Math.cos((Math.PI/4)-Radianes))*Diagonal;//tanslacion del cubo

    Cubo.push(cubo(Dim, Dim, Dim, 0xB60EB9, 'Physical', false));//Se crea el primer cubo
    Cubo.push(cubo(Dim, Dim, Dim, 0x29D2E6, 'Physical', false));//Se crea el segundo cubo
    Cubo.push(cubo(Dim, Dim, Dim, 0xE71D1D, 'Physical', false));//Se crea el tercer cubo
    
  
    for(i=0;i<3;i++)//Transladaremos los cubos al origen, o sea la variable delta
    {
         Cubo[i].translateX(NewDelta); //Transladara el cubo en el eje x 
         Cubo[i].translateY(Delta); //Transladara el cubo en el eje y
         Cubo[i].translateZ(NewDelta); //Transladara el cubo en el eje z
    } 

    
    for(i=1;i<3;i++) //Este for solo se toman los valores de los cubos 1 y 2 lo que provocara que los cubos se transladen en y y de igual forma escalen su tamaño a la mitad
    {
        Tamano=((1)/(Dim/(Delta/i)));//aqui los cubos se escalaran la mitad de su tamaño con respecto al cubo anterior
        Altura=Dim/2+Dim/4+((((Dim/2)+(Dim/4))/2))*(i-1);//aqui aumentara la altura en y 
        Cubo[i].scale.set(Tamano,Tamano,Tamano); //se escalan los cubo en las coordenadas X, Y y Z, con respecto a la variable de tamaño 
        Cubo[i].translateY(Altura);//Se transladara con el metodo de translate con respecto a la variable altura 
    }
    for(i=0;i<3;i++)//Aqui los cubos 0 y 2 se moveranen Y
    {
        if(i==0 || i==2)
        {
            Cubo[i].rotateY(Radianes);
        }
    }
   
    
    
    light = new THREE.PointLight(0xFFFFFF); 
                                            
    light.position.set(-10, 50, 30);          
    scene.add( light ); 

    
    camera.position.set(-3*Dim,4*Dim, 3*Dim);
    camera.lookAt(scene.position);

   
    document.getElementById("webgl-output").appendChild(renderer.domElement);

    
    renderer.render(scene, camera);

}

