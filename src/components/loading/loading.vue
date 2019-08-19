<template>
  <div class="container">
    <div class="loading">
      <div class="earth-orbit orbit">
        <div class="planet earth"></div>
        <div class="venus-orbit orbit">
          <div class="planet venus"></div>
          <div class="mercury-orbit orbit">
            <div class="planet mercury"></div>
            <div class="sun"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.container
    width 100%
    height 100%
    text-align center
.loading 
  width: 250px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin 25% auto
  .earth-orbit 
    width: 165px;
    height: 165px;
    -webkit-animation: spin 12s linear 0s infinite;
  

  .orbit 
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #d5d5d5;
    border-radius: 50%;

    .planet 
      position: absolute;
      top: -5px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #ccc;
    
  

  .venus-orbit 
    width: 120px;
    height: 120px;
    -webkit-animation: spin 7.4s linear 0s infinite;

    .planet 
      position: absolute;
      top: -5px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #ccc;
    
  

  .mercury-orbit 
    width: 90px;
    height: 90px;
    -webkit-animation: spin 3s linear 0s infinite;

    .planet 
      position: absolute;
      top: -5px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #ccc;
    

    .sun 
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #ffab91;
    
  @keyframes spin {
      0%{
          transform : rotate(0)
      }
      100%{
          transform : rotate(360deg)
      }
      
  }

</style>