<h2>Motivation</h2>
<p>Images play super important part in website</p>
<p>For performance you need to choose format like webp and provide image files for desktop and mobile. But may be you have a picture in other format and size so how to convert between image format and how to change size ? and do it automatically ?</p>

<p>The answer is sharp package which is also used ny next.js in Image component</p>

<h2>Implementation</h2>
<ul>
<li>InternalApi.ConvertOneToWebp - convert an image file in /public/images to webp file in the same directory</li>
<li>InternalApi.ConvertAllToWebp - convert all non webp files in /public/images to webp files in the same directory</li>
<li>InternalApi.FileSize - compute the file size in kb</li>
<li>InternalApi.ScaleOne - scale an image file by a factor and create a filein the same directory. The create file name include the scale factor</li>
</ul>