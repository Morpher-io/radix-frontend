<template>
    <div>How to get started</div>
    <div class="w-full max-w-lg">
    <div class="mb-2 flex justify-between items-center">
        <p class="text-sm font-medium text-gray-900 dark:text-white">Card example with CTA button:</p>
    </div>
    <div class="relative bg-gray-50 rounded-lg dark:bg-gray-700 p-4 h-64">
        <div class="overflow-scroll max-h-full">
            <pre><code id="code-block" class="text-sm text-gray-500 dark:text-gray-400 whitespace-pre">&#x27;use client&#x27;;

import Link from &#x27;next/link&#x27;;
import { Navbar } from &#x27;flowbite-react&#x27;;

function Component() {
  return (
    &#x3C;Navbar fluid rounded&#x3E;
      &#x3C;Navbar.Brand as={Link} href=&#x22;https://flowbite-react.com&#x22;&#x3E;
        &#x3C;img src=&#x22;/favicon.svg&#x22; className=&#x22;mr-3 h-6 sm:h-9&#x22; alt=&#x22;Flowbite React Logo&#x22; /&#x3E;
        &#x3C;span className=&#x22;self-center whitespace-nowrap text-xl font-semibold dark:text-white&#x22;&#x3E;Flowbite React&#x3C;/span&#x3E;
      &#x3C;/Navbar.Brand&#x3E;
      &#x3C;Navbar.Toggle /&#x3E;
      &#x3C;Navbar.Collapse&#x3E;
        &#x3C;Navbar.Link href=&#x22;#&#x22; active&#x3E;
          Home
        &#x3C;/Navbar.Link&#x3E;
        &#x3C;Navbar.Link as={Link} href=&#x22;#&#x22;&#x3E;
          About
        &#x3C;/Navbar.Link&#x3E;
        &#x3C;Navbar.Link href=&#x22;#&#x22;&#x3E;Services&#x3C;/Navbar.Link&#x3E;
        &#x3C;Navbar.Link href=&#x22;#&#x22;&#x3E;Pricing&#x3C;/Navbar.Link&#x3E;
        &#x3C;Navbar.Link href=&#x22;#&#x22;&#x3E;Contact&#x3C;/Navbar.Link&#x3E;
      &#x3C;/Navbar.Collapse&#x3E;
    &#x3C;/Navbar&#x3E;
  );
}
</code></pre>
        </div>
    <div class="absolute top-2 end-2 bg-gray-50 dark:bg-gray-700">
        <button data-copy-to-clipboard-target="code-block" data-copy-to-clipboard-content-type="innerHTML" data-copy-to-clipboard-html-entities="true" class="text-gray-900 dark:text-gray-400 m-0.5 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border">
            <span id="default-message" class="inline-flex items-center">
                <svg class="w-3 h-3 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                </svg>
                <span class="text-xs font-semibold">Copy code</span>
            </span>
            <span id="success-message" class="hidden inline-flex items-center">
                <svg class="w-3 h-3 text-blue-700 dark:text-blue-500 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
                <span class="text-xs font-semibold text-blue-700 dark:text-blue-500">Copied</span>   
            </span>
        </button>
    </div>
    </div>
    <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Configure Tailwind CSS and Flowbite before copying the code</p>
</div>
</template>