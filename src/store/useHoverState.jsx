import create from 'zustand';

// Hover state each of the editor color/image picker
const initialHoverState = {
  image_frame: false,
  image_ntp_background: false,
  image_toolbar: false,
  image_inactive_tab_background: false,
  image_frame_overlay: false,
  image_ntp_attribution: false,
  color_frame: false,
  color_ntp_background: false,
  color_toolbar: false,
  color_inactive_tab_background: false,
  color_bottom_link: false,
  color_active_tab_text: false,
  color_inactive_tab_text: false,
  color_bookmark_text: false,
  color_ntp_text: false,
  color_title_bar: false,
  color_navigation: false,
};
