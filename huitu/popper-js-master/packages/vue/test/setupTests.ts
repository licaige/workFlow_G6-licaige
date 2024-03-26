import '@testing-library/jest-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
import {expect, vi} from 'vitest';

expect.extend(matchers);

vi.spyOn(window, 'requestAnimationFrame').mockImplementation(
  (callback: FrameRequestCallback): number => {
    callback(0);
    return 0;
  },
);

function isNullOrUndefined(a: any) {
  return a == null;
}

// From https://github.com/jsdom/jsdom/issues/1261#issuecomment-512217225
Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
  get() {
    let element = this;
    while (
      !isNullOrUndefined(element) &&
      (isNullOrUndefined(element.style) ||
        isNullOrUndefined(element.style.display) ||
        element.style.display.toLowerCase() !== 'none')
    ) {
      element = element.parentNode;
    }

    if (!isNullOrUndefined(element)) {
      return null;
    }

    if (
      !isNullOrUndefined(this.style) &&
      !isNullOrUndefined(this.style.position) &&
      this.style.position.toLowerCase() === 'fixed'
    ) {
      return null;
    }

    if (
      this.tagName.toLowerCase() === 'html' ||
      this.tagName.toLowerCase() === 'body'
    ) {
      return null;
    }

    return this.parentNode;
  },
});
