app.directive("dxField",function(){
	return{
		restrict:"E",
		replace:!0,
		transclude:!0,
		scope:{
			name:"@",
			widthLabel:"@",
			widthValue:"@"
		},
		template:
			'<div class="form-group">'+
				'<label class="{{widthLabel}} control-label">{{name}}</label>'+
				'<div class="{{widthValue}}" ng-transclude></div>'+
			'</div>'
	}
});