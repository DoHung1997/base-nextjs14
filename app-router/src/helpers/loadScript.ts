export const loadScripts = (src: string): Promise<any> =>
  new Promise((resolve, reject) => {
    const script: HTMLScriptElement = document.createElement('script');
    script.src = src;
    script.crossOrigin = 'anonymous';
    script.type = 'text/javascript';
    script.async = true;

    document.body.appendChild(script);

    script.onload = (): void => {
      resolve(script);
    };
    script.onerror = (msg: any): void => {
      console.error(msg);
      script.remove();
      // reject(new Error('Error loading Forge script.'));
      loadScripts(src);
    };
    script.onabort = (msg: UIEvent): void => {
      console.error(msg);
      script.remove();
      // reject(new Error('Forge script loading aborted.'));
      loadScripts(src);
    };
  });

export const loadLink = (src: string): Promise<any> =>
  new Promise((resolve, reject) => {
    let linkExist = document.querySelector(`link[href="${src}"]`);
    if (!linkExist) {
      const link: HTMLLinkElement = document.createElement('link');

      link.href = src;
      link.crossOrigin = 'anonymous';
      link.rel = 'preload';
      link.as = 'fetch';

      document.body.appendChild(link);

      link.onload = (): void => {
        resolve(link);
      };
      link.onerror = (msg: any): void => {
        console.error(msg);
        // reject(new Error('Error loading Forge link.'));
        link.remove();
        loadLink(src);
        return;
      };
      link.onabort = (msg: UIEvent): void => {
        console.error(msg);
        // reject(new Error('Forge script loading aborted.'));
        link.remove();
        loadLink(src);
        return;
      };
    }
  });

export const checkAndLoadDirectory = (directoryPath: string, filesToLoad: string[]) => {
  filesToLoad.forEach((file) => {
    fetch(directoryPath + filesToLoad[0])
      .then(response => {
        loadScripts(directoryPath + file);
      })
      .catch(() => {
        checkAndLoadDirectory(directoryPath, filesToLoad);
      });
  });
};