import React from 'react';
import {
  resolveImagePath
} from '../../utils';

const isVideoSrc = (url) => {
  if (!url || typeof url !== "string") return false;
  return /\.(mp4|webm|ogg)($|\?|#)/i.test(url);
};

const DEFAULT_FALLBACK =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='100%25' height='100%25' fill='%23f8fafc'/%3E%3C/svg%3E";

export const Image = React.memo(
  ({
    src,
    alt = "",
    fallback = DEFAULT_FALLBACK,
    className = "",
    loading = "lazy",
    width,
    height,
    aspectRatio,
    style,
    decoding,
    preload = "none",
    ...props
  }) => {
    const resolved = resolveImagePath(src);
    const [prevSrc, setPrevSrc] = React.useState(resolved);
    const [imgSrc, setImgSrc] = React.useState(resolved);

    if (resolved !== prevSrc) {
      setPrevSrc(resolved);
      setImgSrc(resolved);
    }

    const isEager =
      loading === "eager" ||
      props.fetchPriority === "high" ||
      props.fetchpriority === "high";

    const handleError = React.useCallback(() => {
      if (imgSrc !== fallback) {
        setImgSrc(fallback);
      }
    }, [imgSrc, fallback]);

    if (isVideoSrc(resolved)) {
      return (
        <video
          src={resolved}
          poster={props.poster}
          className={className}
          style={{
            aspectRatio,
            objectFit: "cover",
            width: width || "100%",
            height: height || "100%",
            ...style,
          }}
          autoPlay
          loop
          muted
          playsInline
          preload={preload}
          {...props}
        />
      );
    }

    const computedRatio = aspectRatio || (width && height && !isNaN(Number(width)) && !isNaN(Number(height)) ? `${width} / ${height}` : undefined);

    return (
      <img
        src={imgSrc || fallback}
        alt={alt}
        loading={loading}
        decoding={decoding || (isEager ? "sync" : "async")}
        width={width}
        height={height}
        className={className}
        style={{
          aspectRatio: computedRatio,
          objectFit: computedRatio ? "cover" : undefined,
          ...style,
        }}
        onError={handleError}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

export const ImageDiv = React.memo(
  React.forwardRef(
    (
      {
        image,
        fallback = DEFAULT_FALLBACK,
        children,
        className = "",
        innerClassName = "",
        overlay = false,
        overlayClass = "",
        innerRef,
        preload = "none",
        ...props
      },
      ref
    ) => {
      const resolved = resolveImagePath(image);
      const [prevImage, setPrevImage] = React.useState(resolved);
      const [bgImage, setBgImage] = React.useState(resolved);

      if (resolved !== prevImage) {
        setPrevImage(resolved);
        setBgImage(resolved);
      }

      const isVideo = isVideoSrc(bgImage);

      return (
        <div
          ref={ref}
          className={`relative overflow-hidden ${className}`}
          {...props}
        >
          {isVideo ? (
            <video
              ref={innerRef}
              src={bgImage}
              poster={props.poster}
              className={`${innerClassName} absolute inset-0 w-full h-full object-cover`}
              style={{ zIndex: 0 }}
              autoPlay
              loop
              muted
              playsInline
              preload={preload}
            />
          ) : (
            <div
              ref={innerRef}
              className={innerClassName}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 0,
                background: `url(${bgImage || fallback}) center/cover no-repeat`,
              }}
            />
          )}
          {overlay && (
            <div
              className={overlayClass}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 10,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
              }}
            />
          )}
          <div className="relative z-20 h-full">{children}</div>
        </div>
      );
    }
  )
);

ImageDiv.displayName = "ImageDiv";

export default Image;
