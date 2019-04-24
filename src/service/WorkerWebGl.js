// import DragControls from 'drag-controls'

import DragControls from 'three-dragcontrols';

const THREE = require('three')

let container, controls;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 5000  );
const TrackballControls = require('three-trackballcontrols')
// const DragControls = require('three-dragcontrols')
var objects = [];

let renderer = new THREE.WebGLRenderer({
    // alpha: true,
    antialias: true
});

function setTrackballControls() {
    
    controls = new TrackballControls( camera );
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
}

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
    var geometry = new THREE.BoxBufferGeometry( 40, 40, 40 );
    for ( var i = 0; i < 20; i ++ ) {
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
        object.position.x = Math.random() * 1000 - 500;
        object.position.y = Math.random() * 600 - 300;
        object.position.z = Math.random() * 800 - 400;
        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;
        object.scale.x = Math.random() * 2 + 1;
        object.scale.y = Math.random() * 2 + 1;
        object.scale.z = Math.random() * 2 + 1;
        object.castShadow = true;
        object.receiveShadow = true;
        scene.add( object );
        objects.push( object );
    }
}

function setupUtilities() {

    var axisHelper = new THREE.AxisHelper( 3 );
    scene.add( axisHelper );

    // var gridHelper = new THREE.GridHelper( 20, 20 );
    // scene.add( gridHelper );

    var grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add( grid );
}

function setupDragControls() {
    var dragControls = new DragControls( objects, camera, renderer.domElement );
    dragControls.addEventListener( 'dragstart', function () {
        controls.enabled = false;
    } );
    dragControls.addEventListener( 'dragend', function () {
        controls.enabled = true;
    } );

}


function windowResizing() {
    window.addEventListener( 'resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }, false );
}



//
function animate() {
    requestAnimationFrame( animate );
    render();
    // stats.update();
}
function render() {
    controls.update();
    renderer.render( scene, camera );
}

const WorkerWebGL = {
    setupScene (id) {

        /////////////////////////////////////////
        // Scene Setup
        /////////////////////////////////////////

        container = document.getElementById(id);
        camera.position.z = 1000;
        camera.position.y = 300;
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        container.appendChild( renderer.domElement );
        /////////////////////////////////////////
        // Set TrackballControls
        /////////////////////////////////////////
        setTrackballControls()
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
        /////////////////////////////////////////
        // Window Resizing Listener
        /////////////////////////////////////////
        windowResizing()
        /////////////////////////////////////////
        // Setup DragControls
        /////////////////////////////////////////
        setupDragControls()
    

        animate();
    }
  
}

export default WorkerWebGL