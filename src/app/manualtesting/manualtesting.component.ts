import { Component, OnInit, AfterViewInit } from '@angular/core';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { ajax } from 'rxjs/ajax';
// import * as THREE from 'three/build/three.module.js';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
// import { MTLLoader } from  'three/examples/jsm/loaders/MTLLoader.js';
// import { OBJHelper } from '../helpers/OBJHelper';
import { StringHelper } from '../sharedtools/helpers/StringHelper';

@Component({
  selector: 'app-manualtesting',
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  templateUrl: './manualtesting.component.html',
  styleUrls: ['./manualtesting.component.scss']
})
export class ManualtestingComponent implements OnInit 
{
  // private  currentTime: number;
  // private  previousRenderTime: number = Date.now();
  // private  intervalForTargetFrameRate: number = 1000/24.0;
  // private  timeSinceLastFrameRender: number;

  // private  renderer: THREE.WebGLRenderer; 
  // private  canvas: HTMLCanvasElement; 
  // private  scene: THREE.Scene;
  // private  camera: THREE.PerspectiveCamera;
  // private  mesh: THREE.Mesh;
  // private textareaHTMLInputElement: HTMLInputElement;
  public location: Location;
  constructor(location: Location)
  {
    this.location = location;
  }

/*
  public processData(): void
  {
    const objFileContent: string = this.textareaHTMLInputElement.value ;

    if (StringHelper.isUndefinedOrNullOrEmptyOrWhitespace(objFileContent))
    {
      this.loadOBJandMTLFiles();
     // this.setComplexModelInCode();
    }
    else
    {
      let geometry = OBJHelper.loadOBJDataFromString(objFileContent);
      this.textareaHTMLInputElement.value = JSON.stringify(geometry);

      //THREE.Scene cannot monitor this.mesh for refrence change, so remove old mesh reference
      this.scene.remove(this.mesh); 
      this.mesh = null; //hope garbage collection gets around remove old memory

      const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
      this.mesh = new THREE.Mesh(geometry, material);

      this.scene.add(this.mesh); //add new mesh
    }

    if (this.renderer == null)
    {
      this.init();
    }

    this.animate();

  }

  public objectToJSON(): void
  {
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    this.textareaHTMLInputElement.value = JSON.stringify(geometry);

    //THREE.Scene stores a reference to the mesh object, but its reference does not update with our local this.mesh variable
    this.scene.remove(this.mesh ); //we don't want 2 meshes
    this.mesh = null; //encourage garbage collection
    
    //create new mesh
    const material = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: true});
    this.mesh = new THREE .Mesh(geometry, material);

    //add new mesh to scene
    this.scene.add(this.mesh);

    this.animate();

  }

  public observeJSON(): void
  {
    let urlTextBoxHTMLInputElement = document.getElementById('urlToJSONId') as HTMLInputElement;
    let url = urlTextBoxHTMLInputElement.value; 
    //= `https://api.github.com/users?per_page=2`;
    //= 'http://localhost:5000/WeatherForecast'
    //= 'http://localhost:5000/api/values'

    const jsonObservable = ajax.getJSON(url);
    
    const subscribe = jsonObservable.subscribe(
      res => {this.textareaHTMLInputElement.value = JSON.stringify(res)},
      err => console.error(err)
    );
  }

  public observeText(): void
  {
    let urlTextBoxHTMLInputElement = document.getElementById('urlToJSONId') as HTMLInputElement;
    let url = urlTextBoxHTMLInputElement.value; //= `https://api.github.com/users?per_page=2`;
    const responseObservable = ajax.get(url);
    const subscribe2 = responseObservable.subscribe(
      x => {this.textareaHTMLInputElement.value = String(x.response)},
   //   res => console.log(res),
      err => console.error(err)
    );
    
  }
*/



  init()
  {
    // this.textareaHTMLInputElement = document.getElementById("textareaId") as HTMLInputElement;

    // this.canvas = document.getElementById('CanvasID') as HTMLCanvasElement;
    // this.renderer = new THREE.WebGLRenderer( { canvas: this.canvas } );

    // //var ctx2d = this.canvas.getContext("2d");​

    // this.scene = new THREE.Scene();
    // this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    // this.camera.position.set(0, 5, 12);
    // window.onresize = this.SetRendererSize;
  }

  public ngOnInit(): void 
  {
//    this.init();
  }
/*
  public loadOBJandMTLFiles(): void
  {
    const mtlLoader = new MTLLoader();
    mtlLoader.load('assets/Can.mtl',
        (materials) => {
            materials.preload();

            const objLoader: OBJLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(
                'assets/Can.obj',
                (object) => {
                    this.mesh = object;
                    this.scene.add(object);
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                (error) => {
                    console.log('Error loading OBJ file: ' + error);
                }
            );
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.log('Error loading MTL file: ' + error);
        }
    );
  }


  public setComplexModelInCode(): void
  {

 

    const vertices = [
      // front
      { pos: [-1, -1,  1], norm: [ 0,  0,  1], uv: [0, 0], },
      { pos: [ 1, -1,  1], norm: [ 0,  0,  1], uv: [1, 0], },
      { pos: [-1,  1,  1], norm: [ 0,  0,  1], uv: [0, 1], },
  
      { pos: [-1,  1,  1], norm: [ 0,  0,  1], uv: [0, 1], },
      { pos: [ 1, -1,  1], norm: [ 0,  0,  1], uv: [1, 0], },
      { pos: [ 1,  1,  1], norm: [ 0,  0,  1], uv: [1, 1], },
      // right
      { pos: [ 1, -1,  1], norm: [ 1,  0,  0], uv: [0, 0], },
      { pos: [ 1, -1, -1], norm: [ 1,  0,  0], uv: [1, 0], },
      { pos: [ 1,  1,  1], norm: [ 1,  0,  0], uv: [0, 1], },
  
      { pos: [ 1,  1,  1], norm: [ 1,  0,  0], uv: [0, 1], },
      { pos: [ 1, -1, -1], norm: [ 1,  0,  0], uv: [1, 0], },
      { pos: [ 1,  1, -1], norm: [ 1,  0,  0], uv: [1, 1], },
      // back
      { pos: [ 1, -1, -1], norm: [ 0,  0, -1], uv: [0, 0], },
      { pos: [-1, -1, -1], norm: [ 0,  0, -1], uv: [1, 0], },
      { pos: [ 1,  1, -1], norm: [ 0,  0, -1], uv: [0, 1], },
  
      { pos: [ 1,  1, -1], norm: [ 0,  0, -1], uv: [0, 1], },
      { pos: [-1, -1, -1], norm: [ 0,  0, -1], uv: [1, 0], },
      { pos: [-1,  1, -1], norm: [ 0,  0, -1], uv: [1, 1], },
      // left
      { pos: [-1, -1, -1], norm: [-1,  0,  0], uv: [0, 0], },
      { pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [1, 0], },
      { pos: [-1,  1, -1], norm: [-1,  0,  0], uv: [0, 1], },
  
      { pos: [-1,  1, -1], norm: [-1,  0,  0], uv: [0, 1], },
      { pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [1, 0], },
      { pos: [-1,  1,  1], norm: [-1,  0,  0], uv: [1, 1], },
      // top
      { pos: [ 1,  1, -1], norm: [ 0,  1,  0], uv: [0, 0], },
      { pos: [-1,  1, -1], norm: [ 0,  1,  0], uv: [1, 0], },
      { pos: [ 1,  1,  1], norm: [ 0,  1,  0], uv: [0, 1], },
  
      { pos: [ 1,  1,  1], norm: [ 0,  1,  0], uv: [0, 1], },
      { pos: [-1,  1, -1], norm: [ 0,  1,  0], uv: [1, 0], },
      { pos: [-1,  1,  1], norm: [ 0,  1,  0], uv: [1, 1], },
      // bottom
      { pos: [ 1, -1,  1], norm: [ 0, -1,  0], uv: [0, 0], },
      { pos: [-1, -1,  1], norm: [ 0, -1,  0], uv: [1, 0], },
      { pos: [ 1, -1, -1], norm: [ 0, -1,  0], uv: [0, 1], },
  
      { pos: [ 1, -1, -1], norm: [ 0, -1,  0], uv: [0, 1], },
      { pos: [-1, -1,  1], norm: [ 0, -1,  0], uv: [1, 0], },
      { pos: [-1, -1, -1], norm: [ 0, -1,  0], uv: [1, 1], },
    ];

    const n = 36;
    const positions = new Float32Array(3 * n);
    const normals = new Float32Array(3 * n);
    const uvs = new Float32Array(2 * n);
    let i = 0;
    let j = 0;
    for (const vertex of vertices) 
    {
      positions[i] = vertex.pos[0];
      positions[i + 1] = vertex.pos[1];
      positions[i + 2] = vertex.pos[2];

      normals[i] = vertex.norm[0];
      normals[i + 1] = vertex.norm[1];
      normals[i + 2] = vertex.norm[2];
      
      uvs[j] = vertex.uv[0];
      uvs[j + 1] = vertex.uv[1];

      i = i + 3;
      j = j + 2;
    }
  
    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute(
        'normal',
        new THREE.BufferAttribute(normals, 3));
    geometry.setAttribute(
        'uv',
        new THREE.BufferAttribute(uvs, 2));
  
    const loader = new THREE.TextureLoader();
    const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/star.png');
  
   
   
    const material = new THREE.MeshPhongMaterial({color: 0xFF8000, map: texture});


   if (this.mesh != null)
   {
    //THREE.Scene stores a reference to the mesh object, but its reference does not update with our local this.mesh variable
    this.scene.remove(this.mesh ); //we don't want 2 meshes
    this.mesh = null; //encourage garbage collection
   }


   this.textareaHTMLInputElement.value = JSON.stringify(geometry);


  // const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 5, 12);
    this.scene.add(light);
  }
*/

  public ngAfterViewInit()
  {
    // //this.init();
    // //this.camera.position.set(0.0, 5, 15);

    // //https://threejsfundamentals.org/threejs/lessons/threejs-custom-buffergeometry.html
    // //click links for sample JS!!!!!!!!!!!!!!!!!!!!!

    // //https://threejs.org/docs/#api/en/core/BufferGeometry

    // //this.setComplexModelInCode();

    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    // if (window.innerHeight !== 0)
    // {
    //   this.camera.aspect = window.innerWidth / window.innerHeight;
    // }
    // this.animate();
  }


  /*
  public SetRendererSize(): void
  {
//    if (this.renderer == null)
    {
      this.renderer = new THREE.WebGLRenderer( { canvas: this.canvas } );
    }

    

    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    if (window.innerHeight !== 0)
    {

     // if (this.camera == null)
      {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
      }

      this.camera.aspect = window.innerWidth / window.innerHeight;
    }
  }




 // private i:number = 0;
  public animate(): void
  {
    //window.requestAnimationFrame(this.animate);
    window.requestAnimationFrame(() => this.animate());
    
    //frame rate calculations
    this.currentTime = Date.now();
    this.timeSinceLastFrameRender = this.currentTime - this.previousRenderTime;


    if ((this.mesh != null) && (this.timeSinceLastFrameRender >= this.intervalForTargetFrameRate))
    {
      //adjust for time taken to render the frame
      this.previousRenderTime = this.currentTime - (this.timeSinceLastFrameRender % this.intervalForTargetFrameRate);

      //simulation per frame logic
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.02;

      //finally do render
      this.renderer.render(this.scene, this.camera);
    }

  
      
  }

*/






}
