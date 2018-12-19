# yii2-ajax-request
Allow send and receive data in a request prepared with yii2 ajax request

## Installation
  Include the script into head from your page.
  
  Ex.: 
  ``` html
  <script src="yii2AjaxRequest.js" />
  ```
  
## Usage
  Case your ActiveForm not contain a id defined from you, set.
  
  Ex.:
  ``` php
  <?php
    $form = ActiveForm::begin(['id'=>'my-form']);
    ...
    ActiveForm::end();
  ?>
  ```
  
  After, add this call into final of your page (Or use registerJs):
  
  ``` es6
  <script>
    yii2AjaxRequest('#my-form') // The id or class of your form
      .then((success) => { // The responde of request. 
        
      })
      .catch((err)  => { // The return of a block try / catch
      
      });
  </script>
  ```
  
  When your form as submited, the request is sended by ajax.
  
  ### Response
  
  The object "success" return this content:
  
  ``` javascript
    {
      data: {id:1233,name:"User",...} // The response of you method called
      status: 201,200,500... // The status of request
    }
  ```
  
  The object "err" return the content of a exception
  
  ## Authors
  * **Rony Silva** - *Initial work*
