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
 * @returns {Promise<any>}
 */
const yii2AjaxRequest = (formReference)  =>
{

  if(formReference && $(formReference).length){

    return new Promise((resolv,reject)  => {

      $(formReference).on('beforeSubmit', function(e) {

        try{
          var form = $(this);

          var formData = form.serialize();

          $.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            dataType: 'json',
            data: formData,
            complete: function (data) {
              resolv({
                data:data.responseJSON,
                status:data.status
              })
            },
          });
        }
        catch(err){
          console.log("yii2AjaxRequest:", err);
          reject(err);
        }

        e.preventDefault();

      }).on('submit', function(e){
        e.preventDefault();
      });

    });

  }
  else{
    throw ("The reference to form element is invalid!");
  }
}

