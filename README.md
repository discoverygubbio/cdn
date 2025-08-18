# cdn for discoverygubbio.com

this repository hosts static files used as a simple **cdn** for the website [discoverygubbio.com](https://discoverygubbio.com). it includes videos, images, scripts, and other static assets that are served directly to the website visitors for faster loading and better performance.

## how to use the cdn

files can be referenced directly from your website. examples:

**example for a video:**
```
<video width="100%" controls>
  <source src="https://cdn.discoverygubbio.com/public/video_basilica.mp4" type="video/mp4">
  your browser does not support the video tag.
</video>
```

## deployment
to update the cdn with new files or videos:

- add new files to your local repository, keeping filenames simple (no spaces or special characters).

- stage and commit the files (use github-lsf for bigger files):

  ```
  git add [something]
  git commit -m "add new cdn assets"
  ```

- pull remote changes to avoid conflicts:
    
    ```
    git pull origin main --rebase
    ```
    
- push your changes:
    
    ```
    git push origin main
    ```

> note: when using mp4 videos on github pages, ensure the mime type is correct. if issues occur, renaming .mp4 to .mp4v files can sometimes help.

## license
this repository is released under the mit license. (see also [LICENSE.md](/license.md))
> this repo is designed to support discoverygubbio.com as a free and fast cdn for its static assets.
