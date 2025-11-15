/**
 * Convierte un timestamp a un formato "hace X tiempo".
 * @param timestamp - El timestamp (ej. new Date().getTime())
 */
export function formatTimeAgo(timestamp: number): string {
    const now = new Date().getTime();
    const seconds = Math.floor((now - timestamp) / 1000);

    // Más de 1 año
    let interval = seconds / 31536000;
    if (interval > 1) {
        return "hace " + Math.floor(interval) + " año" + (Math.floor(interval) > 1 ? 's' : '');
    }
    // Más de 1 mes
    interval = seconds / 2592000;
    if (interval > 1) {
        return "hace " + Math.floor(interval) + " mes" + (Math.floor(interval) > 1 ? 'es' : '');
    }
    // Más de 1 día
    interval = seconds / 86400;
    if (interval > 1) {
        return "hace " + Math.floor(interval) + " día" + (Math.floor(interval) > 1 ? 's' : '');
    }
    // Más de 1 hora
    interval = seconds / 3600;
    if (interval > 1) {
        return "hace " + Math.floor(interval) + " h";
    }
    // Más de 1 minuto
    interval = seconds / 60;
    if (interval > 1) {
        return "hace " + Math.floor(interval) + " min";
    }
    // Menos de 1 minuto
    return "justo ahora";
}