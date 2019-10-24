import template from 'lodash/template'
import templateSettings from 'lodash/templateSettings'

templateSettings.interpolate = /\{\{(.+?)\}\}/g

export const canvas = template(`
  <canvas
    id="{{ id }}"
    width="800"
    height="400"
    aria-label="{{ ariaLabel }}"
    role="img"
  >
    <p>Your browser does not support the canvas element.</p>
  </canvas>
`)
