import SpriteRenderer from "ennj/render/SpriteRenderer";

window.onload = () => {
    console.log('GO');
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.width = 800;
    canvas.height = 500;

    const gl = canvas.getContext('webgl2') as WebGLRenderingContext;

    const spriteRenderer = new SpriteRenderer(gl);

    const drawBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, drawBuffer);
    const verticies = [
        1.0, 1.0,   // Top Right
        -1.0, 1.0,  // Top Left
        1.0, -1.0,  // Bottom Right
        -1.0, 1.0,  // Top Left
        1.0, -1.0,  // Bottom Right
        -1.0, -1.0  // Bottom Left
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticies), gl.STATIC_DRAW);

    gl.viewport(0, 0, 800, 500);
    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, drawBuffer);
    gl.vertexAttribPointer((<any>SpriteRenderer).shader.getAttibute('a_vertexPosition'), 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray((<any>SpriteRenderer).shader.getAttibute('a_vertexPosition'));

    spriteRenderer.render(gl);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
};
