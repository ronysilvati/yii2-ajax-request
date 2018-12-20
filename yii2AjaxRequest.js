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
const yii2AjaxRequest = (formReference,externalConfigs,callbackSuccess,callbackError)  =>
{
  let configs = {
    loadingImg: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTlweCIgIGhlaWdodD0iMTlweCIgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBjbGFzcz0ibGRzLWR1YWwtcmluZyIgc3R5bGU9ImJhY2tncm91bmQ6IG5vbmU7Ij48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiBuZy1hdHRyLXI9Int7Y29uZmlnLnJhZGl1c319IiBuZy1hdHRyLXN0cm9rZS13aWR0aD0ie3tjb25maWcud2lkdGh9fSIgbmctYXR0ci1zdHJva2U9Int7Y29uZmlnLnN0cm9rZX19IiBuZy1hdHRyLXN0cm9rZS1kYXNoYXJyYXk9Int7Y29uZmlnLmRhc2hhcnJheX19IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHI9IjQwIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZT0iIzI4MjkyZiIgc3Ryb2tlLWRhc2hhcnJheT0iNjIuODMxODUzMDcxNzk1ODYgNjIuODMxODUzMDcxNzk1ODYiIHRyYW5zZm9ybT0icm90YXRlKDE3My43MTkgNTAgNTApIj48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgY2FsY01vZGU9ImxpbmVhciIgdmFsdWVzPSIwIDUwIDUwOzM2MCA1MCA1MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49IjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlVHJhbnNmb3JtPjwvY2lyY2xlPjwvc3ZnPg==',
    messageLoading: 'Please, wait',
    resetForm: true
  }

  if(externalConfigs && (externalConfigs instanceof Object)){
    for(const key in externalConfigs){
      if(key in configs){
        configs[key] = externalConfigs[key];
      }
    }
  }

  if(formReference && $(formReference).length){

    $(formReference).on('beforeSubmit', function(e) {
      const self = $(this);
      const referenceButtonSubmit = 'button[type=submit]';
      const loadingContent = "<img src='"+configs.loadingImg+"' > " + configs.messageLoading;
      const originalMessageSubmitButton = $(referenceButtonSubmit,self).html();

      try{
        var form = $(this);
        var formData = form.serialize();

        $(referenceButtonSubmit,self).prop('disabled',true);
        $(referenceButtonSubmit,self).html(loadingContent);

        $.ajax({
          url: form.attr('action'),
          type: form.attr('method'),
          dataType: 'json',
          data: formData,
          complete: function (data) {
            $(referenceButtonSubmit,self).prop('disabled',false);
            $(referenceButtonSubmit,self).html(originalMessageSubmitButton);

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
        $(referenceButtonSubmit,self).html(originalMessageSubmitButton);

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

