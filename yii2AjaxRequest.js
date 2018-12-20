/**
 * Date: 12/12/18
 * Time: 10:13
 * Developer: Rony Silva
 * Email: ronysilvati@live.com
 * GitHub: github.com/ronysilvati
 */

/**
 *
 * @param formReference - String - elementId or elementClass
 * @param configs - Object - Object with configs
 * @param callbackSuccess - Function - function to be called when complete the request
 * @param callbackError - Function - function to be called if as a crash.
 *
 */
const yii2AjaxRequest = (formReference,configs,callbackSuccess,callbackError)  =>
{
  if(!(configs) || !(configs instanceof Object)){
    const configs = {
      resetForm: true
    };
  }

  if(formReference && $(formReference).length){

    $(formReference).on('beforeSubmit', function(e) {
      const self = $(this);
      const referenceButtonSubmit = 'button[type=submit]';

      try{
        var form = $(this);
        var formData = form.serialize();
        $(referenceButtonSubmit,self).prop('disabled',true);

        $.ajax({
          url: form.attr('action'),
          type: form.attr('method'),
          dataType: 'json',
          data: formData,
          complete: function (data) {
            $(referenceButtonSubmit,self).prop('disabled',false);

            if(configs.resetForm){
              form.trigger("reset");
            }

            if(typeof callbackSuccess === 'function'){
              callbackSuccess({
                data:data.responseJSON,
                status:data.status
              });
            }
          },
        });
      }
      catch(err){
        console.log("yii2AjaxRequest:", err);
        $(referenceButtonSubmit,self).prop('disabled',false);

        if(typeof callbackError === 'function'){
          callbackError(err);
        }

      }

      e.preventDefault();

    }).on('submit', function(e){
      e.preventDefault();
    });

  }
  else{
    throw ("The reference to form element is invalid!");
  }
}

