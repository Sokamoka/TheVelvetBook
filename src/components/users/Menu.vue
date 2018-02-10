<template>
  <nav class="panel">
    <router-link to='/user/settings' class="panel-block">
      {{ $t('settings') }}
    </router-link>
    <router-link to='/user/password' class="panel-block">
      {{ $t('modify-password') }}
    </router-link>
    <router-link to='/user/email' class="panel-block">
      {{ $t('email') }}
    </router-link>
  </nav>
</template>
