<template>
   <li class="mb-10 ms-6">            
        <span class="absolute flex items-center justify-center w-6 h-6  rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
          <slot name="icon"></slot>
        </span>
        <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white"><slot name="heading"></slot></h3>
        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"><slot></slot></p>
        
    </li>
</template>
