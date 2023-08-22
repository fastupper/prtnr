import {Platform} from 'react-native';

import {CameraOptions, ImageLibraryOptions, Callback} from './types';
import {
  imageLibrary as nativeImageLibrary,
  camera as nativeCamera,
} from './platform/native';
import {
  imageLibrary as webImageLibrary,
  camera as webCamera,
} from './platform/web';

export * from './types';

export function launchCamera(options: CameraOptions, callback?: Callback) {
  return Platform.OS === 'web'
    ? webCamera(options, callback)
    : nativeCamera(options, callback);
}

export function launchImageLibrary(
  options: ImageLibraryOptions,
  callback?: Callback,
) {
  return Platform.OS === 'web'
    ? webImageLibrary(options, callback)
    : nativeImageLibrary(options, callback);
}