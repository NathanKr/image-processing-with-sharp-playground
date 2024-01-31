<h2>Motivation</h2>
<p>Images play super important part in website</p>
<p>For performance you need to choose format like webp and provide image files for desktop and mobile. But may be you have a picture in other format and size so how to convert between image format and how to change size ? and do it automatically ?</p>

<p>The answer is sharp package which is also used ny next.js in Image component</p>

<h2>Implementation</h2>
<ul>
<li>/api/convert-lion-to-webp - convert a jpg file to webp file. The converted file is cretaed in /output directory</li>
<li>/api/convert-all-to-webp - convert a all non webp files in /public/images to webp files. The converted files are created in public directory</li>
</ul>