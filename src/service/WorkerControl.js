// import TransformControls from 'three-transform-controls';



const THREE = require('three')

let container, controls, transformControl, orbit;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 5000  );
const TrackballControls = require('three-trackballcontrols')
const TransformControls = require('three-transform-controls')(THREE);
const OrbitControls = require('three-orbitcontrols')

var objects = [];

let renderer = new THREE.WebGLRenderer({
    // alpha: true,
    antialias: true
});


function setScene() {
    scene.background = new THREE.Color( 0xf0f0f0 );
    scene.add( new THREE.AmbientLight( 0x505050 ) );
    var light = new THREE.SpotLight( 0xffffff, 1.5 );
    light.position.set( 0, 500, 2000 );
    light.angle = Math.PI / 9;
    light.castShadow = true;
    light.shadow.camera.near = 1000;
    light.shadow.camera.far = 4000;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    scene.add( light );
}

function addGeometry() {
    // var geometry = new THREE.BoxBufferGeometry( 40, 40, 40 );
    // for ( var i = 0; i < 1; i ++ ) {
    //     var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
    //     object.position.x = Math.random() * 1000 - 500;
    //     object.position.y = Math.random() * 600 - 300;
    //     object.position.z = Math.random() * 800 - 400;
    //     object.rotation.x = Math.random() * 2 * Math.PI;
    //     object.rotation.y = Math.random() * 2 * Math.PI;
    //     object.rotation.z = Math.random() * 2 * Math.PI;
    //     object.scale.x = Math.random() * 2 + 1;
    //     object.scale.y = Math.random() * 2 + 1;
    //     object.scale.z = Math.random() * 2 + 1;
    //     object.castShadow = true;
    //     object.receiveShadow = true;
    //     scene.add( object );
    //     objects.push( object );
    //     transformControl.attach( object );

    // }

    const path = ['https://threejs.org/examples/models/collada/elf/elf.dae']

    var ColladaLoader = require('three-collada-loader');
    let loader = new ColladaLoader();
    loader.options.convertUpAxis = true;

    for (let i = 0; i < path.length; i++ ) {



        loader.load( path[i], collada => {
            let dae = collada.scene;
            


            dae.position.set(0, 0, 0);
            dae.scale.set(50, 50, 50);
            scene.add(dae);
            objects.push( dae );
            transformControl.attach( dae );
           
            // addHelpers(dae)
        });
    }
}

function setupUtilities() {

    var grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add( grid );
}

function setupControls() {
    orbit = new OrbitControls( camera, renderer.domElement );
    orbit.update();
    orbit.addEventListener( 'change', render );
    
    transformControl = new TransformControls( camera, renderer.domElement );
    transformControl.addEventListener( 'change', render );
    transformControl.addEventListener( 'dragging-changed', function ( event ) {
        orbit.enabled = ! event.value;
    } );
    scene.add( transformControl );
    window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener( 'keydown', function ( event ) {
        switch ( event.keyCode ) {
            case 81: // Q
                transformControl.setSpace( transformControl.space === "local" ? "world" : "local" );
                break;
            case 17: // Ctrl
                transformControl.setTranslationSnap( 100 );
                transformControl.setRotationSnap( THREE.Math.degToRad( 15 ) );
                break;
            case 87: // W
                transformControl.setMode( "translate" );
                break;
            case 69: // E
                transformControl.setMode( "rotate" );
                break;
            case 82: // R
                transformControl.setMode( "scale" );
                break;
            case 187:
            case 107: // +, =, num+
                transformControl.setSize( transformControl.size + 0.1 );
                break;
            case 189:
            case 109: // -, _, num-
                transformControl.setSize( Math.max( transformControl.size - 0.1, 0.1 ) );
                break;
            case 88: // X
                transformControl.showX = ! transformControl.showX;
                break;
            case 89: // Y
                transformControl.showY = ! transformControl.showY;
                break;
            case 90: // Z
                transformControl.showZ = ! transformControl.showZ;
                break;
            case 32: // Spacebar
                transformControl.enabled = ! transformControl.enabled;
                break;
        }
    } );
    window.addEventListener( 'keyup', function ( event ) {
        switch ( event.keyCode ) {
            case 17: // Ctrl
                transformControl.setTranslationSnap( null );
                transformControl.setRotationSnap( null );
                break;
        }
    } );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
}
function render() {
    renderer.render( scene, camera );
}



const WorkerControl = {
    setupScene (id) {

        container = document.getElementById(id);
        camera.position.z = 1000;
        camera.position.y = 300;
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        container.appendChild( renderer.domElement );

        /////////////////////////////////////////
        // Setup Controls
        /////////////////////////////////////////
        setupControls()
        /////////////////////////////////////////
        // Set Scene
        /////////////////////////////////////////
        setScene()
        /////////////////////////////////////////
        // Add Geometry
        /////////////////////////////////////////
        addGeometry()
        /////////////////////////////////////////
        // Setup Utilities
        /////////////////////////////////////////
        setupUtilities()
       

        render();
    }
}
export default WorkerControl