import { fabric } from 'fabric';
import { OBJECT_DEFAULT_CONFIG } from '@/utils/constants';
import { IMAGE_CLIPPATH_QUALITY } from '@/config';

export const initObjectPrototype = () => {
  if (IMAGE_CLIPPATH_QUALITY) {
    fabric.Object.prototype.needsItsOwnCache = () => false
  }

  // Text global config
  Object.keys(OBJECT_DEFAULT_CONFIG).forEach(key => {
    fabric.Object.prototype[key] = OBJECT_DEFAULT_CONFIG[key];
  });

   // Selection/Group global config
  const asConfig = {
    borderColor: '#cccddd',
    borderDashArray: [7, 10],
    borderScaleFactor: 3,
    padding: 10
  }
  Object.keys(asConfig).forEach(key => {
    fabric.ActiveSelection.prototype[key] = asConfig[key];
    fabric.Group.prototype[key] = asConfig[key];
  });
  fabric.Group.prototype.subTargetCheck = true;
}