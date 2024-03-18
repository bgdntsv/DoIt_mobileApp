declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.webp'
declare module 'tinycolor2' {
    export function mostReadable(
        bg: string,
        colors: Array<string>
    ): {
        toHexString: function
    }
}
