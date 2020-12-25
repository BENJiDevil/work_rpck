<?php
/* get image from link (youtube/vimeo) */
if(strpos($link, 'youtu.be')){
    if (preg_match('@youtu.be\/(.+)@', $link, $m)) {
        $result[0] = 'http://www.youtube.com/watch?v='.str_replace('https://youtu.be/','', $link);
        $result[1] = 'http://img.youtube.com/vi/'.str_replace('https://youtu.be/','', $link).'/sddefault.jpg';
    }
}
if(strpos($link, 'youtube.com')){
        $result[0] = $link;
        $result[1] = 'http://img.youtube.com/vi/'.str_replace('https://www.youtube.com/watch?v=','', $link).'/sddefault.jpg';
}
if(strpos($link, 'vimeo')){
    if (preg_match('@vimeo.com\/(.+)@', $link, $m)) {
      $code = $m[1];
      $data = simplexml_load_file("https://vimeo.com/api/v2/video/{$code}.xml");
      $result[0] = $link;
      $result[1] = (string) $data->video->thumbnail_large;
    }
}
return $result;