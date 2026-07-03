'use client';

import { useEffect, useRef, useState } from 'react';
import type { MembershipFormContent } from '@/types/content';

// La foto debe tomarse en el momento (no subirse desde galería): además de
// quedar en el legajo, se usa para verificación de identidad y sustituye la
// firma del solicitante en este trámite.
export default function PhotoCapture({ content }: { content: MembershipFormContent }) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraOpen(false);
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      setCameraOpen(true);
    } catch {
      setCameraOpen(false);
    }
  };

  // El <video> solo se monta cuando cameraOpen pasa a true (render condicional
  // más abajo), así que videoRef.current todavía es null en openCamera(): el
  // stream se asigna acá, después de que el elemento ya existe en el DOM.
  useEffect(() => {
    if (cameraOpen && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(() => {});
    }
  }, [cameraOpen]);

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    setPhoto(canvas.toDataURL('image/jpeg', 0.9));
    stopCamera();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-ink mb-2">{content.fields.photo}</label>
      <p className="text-xs text-granite mb-3">{content.photoHint}</p>

      <input type="hidden" name="photo" value={photo ?? ''} required />

      {photo && (
        <div className="mb-3">
          <img src={photo} alt={content.fields.photo} className="w-32 h-32 object-cover rounded-md border border-line" />
        </div>
      )}

      {cameraOpen && (
        <div className="mb-3 space-y-3">
          <video ref={videoRef} className="w-full max-w-xs rounded-md border border-line" muted playsInline />
          <button
            type="button"
            onClick={capturePhoto}
            className="rounded-md bg-black text-white px-4 py-2 text-sm font-bold shadow-sm hover:bg-atlantic transition-colors"
          >
            {content.photoCaptureLabel}
          </button>
        </div>
      )}

      {!cameraOpen && (
        <button
          type="button"
          onClick={openCamera}
          className="rounded-md border border-line bg-white dark:bg-[#13272F] px-4 py-2 text-sm font-medium text-ink hover:border-gold transition-colors"
        >
          {photo ? content.photoRetakeLabel : content.photoCameraLabel}
        </button>
      )}
    </div>
  );
}
