/**
 * Created by TomasDePomas on 22-7-15.
 */

Template.notifierToggle.helpers({
    attrDisabled: function () {
        switch (Session.get('notificationStatus')){
            case 'not_supported':
            case 'denied':
            case 'error':
                return 'disabled';

            case 'disabled':
            case 'enabled':
                return '';

            default:
                return 'disabled';
        }
    },
    attrChecked: function () {
        if(Session.get('notificationStatus') === 'enabled'){
            return 'checked';
        }
        return '';
    }
});

Template.notifierToggle.events({
    'click [name="notificationStatus"]': function (event) {
        var $this = $(event.target);

        if(!$this.prop('disabled')){
            $this.prop('disabled', true);

            if(event.target.checked){
                Notifier.subscribe().then(function(){
                    $this.prop('checked', true);
                    $this.prop('disabled', false);
                }, function(error){
                    $this.prop('checked', false);
                    $this.prop('disabled', Session.get('notificationStatus') != 'disabled');
                });
            }else{
                Notifier.unsubscribe().then(function(){
                    $this.prop('checked', false);
                    $this.prop('disabled', false);
                }, function(error){
                    $this.prop('checked', true);
                    $this.prop('disabled', false);
                });
            }
        }
    }
});