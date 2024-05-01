<template>
  <div>
    <h1>IV. {{ $t('nav.furtherReading') }}</h1>
    <p class="main-text">
      {{ $t('furtherReading.introduction') }}
    </p>
    <ul class="ml-5 my-2 list-disc">
      <li>
        <a class="a-link" target="_blank" href="https://pettingzoo.farama.org/">PettingZoo</a>
      </li>
      <li><a class="a-link" target="_blank" href="https://docs.agilerl.com/en/latest/">AgileRL</a></li>
      <li>
        <a class="a-link" target="_blank" href="https://www.marl-book.com/">{{ $t('furtherReading.marlBook') }}</a>
      </li>
      <li>
        <a class="a-link" target="_blank" href="https://github.com/TimeBreaker/MARL-resources-collection">{{
          $t('furtherReading.marlResourcesCollection')
        }}</a>
      </li>
      <li>
        <a class="a-link" target="_blank" href="https://github.com/TimeBreaker/MARL-papers-with-code">{{
          $t('furtherReading.marlPapersWithCode')
        }}</a>
      </li>
      <li>
        <a class="a-link" target="_blank" href="https://github.com/instadeepai/awesome-marl?tab=readme-ov-file"
          >Awesome MARL</a
        >
      </li>
    </ul>
  </div>
</template>
