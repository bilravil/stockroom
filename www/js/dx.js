/*app.directive( "dxField", function() {
	return {
		restrict: "E",
		replace: !0,
		transclude: !0,
		scope: {
			name: "@",
			widthLabel: "@",
			widthValue: "@"
		},
		template: '<div class="form-group"><label class="{{widthLabel}} control-label">{{name}}</label><div class="{{widthValue}}" ng-transclude></div></div>'
	}
} ),*/ app.directive( "dxPaging", function( $timeout ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			all: "=",
			current: "=",
			show: "=",
			onPaging: "&",
			"class": "@"
		},
		link: function( $scope, $element ) {
			$scope.items = [], $scope.Init = function() {
				var items = [],
					all = $scope.all,
					show = $scope.show,
					current = $scope.current;
				return all / show <= 1 ? ( items.push( {
					title: "1-" + all,
					current: 0
				} ), items ) : all / show <= 2 ? ( items.push( {
					title: "1-" + show,
					current: 0
				} ), items.push( {
					title: show + "-" + all,
					current: show
				} ), items ) : all / show <= 3 ? ( items.push( {
					title: "1-" + show,
					current: 0
				} ), items.push( {
					title: show + "-" + show * 2,
					current: show
				} ), items.push( {
					title: show * 2 + "-" + all,
					current: 2 * show
				} ), items ) : current < show ? ( items.push( {
					title: "1-" + show,
					current: 0
				} ), items.push( {
					title: show + "-" + show * 2,
					current: show
				} ), items.push( {
					title: show * 2 + "-" + show * 3,
					current: 2 * show
				} ), items ) : current + show > all ? ( items.push( {
					title: current + 1 - show * 2 + "-" + ( current - show ),
					current: current - 2 * show
				} ), items.push( {
					title: current + 1 - show + "-" + current,
					current: current - show
				} ), items.push( {
					title: current + 1 + "-" + all,
					current: current
				} ), items ) : ( items.push( {
					title: current + 1 - show + "-" + current,
					current: current - show
				} ), items.push( {
					title: current + 1 + "-" + ( current + show ),
					current: current
				} ), items.push( {
					title: current + 1 + show + "-" + ( current + show * 2 ),
					current: current + show
				} ), items )
			}, $scope.Go = function( current ) {
				$scope.current = current, $timeout( function() {
					$scope.onPaging( {
						current: current
					} )
				} )
			}, $scope.First = function() {
				$scope.current = 0, $timeout( function() {
					$scope.onPaging( {
						current: $scope.current
					} )
				} )
			}, $scope.Last = function() {
				$scope.current = $scope.all - $scope.all % $scope.show, $timeout( function() {
					$scope.onPaging( {
						current: $scope.current
					} )
				} )
			}, $scope.$watch( "all", function( value ) {
				$scope.items = $scope.Init()
			} ), $scope.$watch( "current", function( value ) {
				$scope.items = $scope.Init()
			} ), $scope.$watch( "show", function( value ) {
				$scope.items = $scope.Init()
			} )
		},
		template: '<ul class="pagination {{class}}" ><li ng-class="{disabled:current==0}"  ng-click="First()"><a href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li><li ng-repeat="item in items" ng-class="{active:item.current==current}" ng-click="Go(item.current)"><a href="#">{{item.title}}</a></li><li ng-class="{disabled:(current+show)>=all}" ng-click="Last()"><a href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li></ul>'
	}
} ), app.directive( "dxPhones", function( $timeout ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			value: "=",
			ngReadonly: "=",
			menu: "="
		},
		link: function( $scope, $element ) {
			$scope.value = $scope.value || [ {
				type: "work"
			} ], $scope.Type2String = function( item ) {
				if ( item.type == undefined ) return "Другое";
				for ( var i = 0; i < $scope.items.length; i++ )
					if ( $scope.items[ i ].id == item.type ) return $scope.items[ i ].name;
				return "Другое"
			}, $scope.Add = function( index, $event ) {
				$scope.value.splice( index + 1, 0, {
					type: $scope.value[ index ].type
				} )
			}, $scope.Delete = function( index, $event ) {
				$scope.value.splice( index, 1 )
			}, $scope.Mask = function( item ) {
				if ( item.type == undefined ) return "(999) 999-9999";
				for ( var i = 0; i < $scope.items.length; i++ )
					if ( $scope.items[ i ].id == item.type ) return $scope.items[ i ].mask;
				return "(999) 999-9999"
			}, $scope.Def = function() {
				$scope.items = [ {
					id: "work",
					name: "Рабочий",
					mask: "(999) 999-9999 вн. ?9?9?9?9"
				}, {
					id: "home",
					name: "Домашний",
					mask: "(999) 999-9999"
				}, {
					id: "mob",
					name: "Мобильный",
					mask: "(999) 999-9999"
				} ]
			}, $scope.$watch( "menu", function( value ) {
				if ( value == undefined ) {
					$scope.Def();
					return
				}
				if ( value == "off" ) {
					$scope.items = [];
					return
				}
				$scope.items = [];
				for ( var key in value )
					if ( value.hasOwnProperty( key ) ) {
						var t = value[ key ].split( "#" );
						t.length == 1 ? $scope.items.push( {
							id: key,
							name: value[ key ],
							mask: "(999) 999-9999"
						} ) : $scope.items.push( {
							id: key,
							name: t[ 0 ],
							mask: t[ 1 ]
						} )
					}
			} ), $scope.Def()
		},
		template: '<div><div class="input-group" ng-repeat="item in value"><span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="Add($index,$event)" ng-if="!ngReadonly"><span class="glyphicon glyphicon-plus"></span></button><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:140px" ng-disabled="ngReadonly">{{Type2String(item)}}&nbsp;<span class="caret pull-right" style="margin-top:10px" ng-if="!ngReadonly"></span><span class="sr-only">Toggle Dropdown</span></button><ul class="dropdown-menu" ><li ng-repeat="m in items" ng-click="item.type=m.id" ><a href="">{{m.name}}</a></li></ul></span><input type="text" class="form-control" ng-model="item.phone" ui-mask="{{Mask(item)}}" ui-mask-placeholder placeholder="Введите номер телефона" ng-readonly="ngReadonly"><span class="input-group-btn"  ng-if="!ngReadonly"><button class="btn btn-default" type="button" title="Удалить" ng-click="Delete($index,$event)" ng-disabled="value.length==1"><span class="glyphicon glyphicon-remove"></span></button></span></div></div>'
	}
} ), app.directive( "dxEmails", function( $timeout ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			value: "=",
			ngReadonly: "="
		},
		link: function( $scope, $element ) {
			$scope.value = $scope.value || [ {
				type: "work"
			} ], $scope.Type2String = function( item ) {
				if ( item.type == undefined ) return "Другое";
				switch ( item.type ) {
					case "pers":
						return "Личная";
					case "work":
						return "Рабочая"
				}
				return "Другое"
			}, $scope.Add = function( index, $event ) {
				$scope.value.splice( index + 1, 0, {
					type: $scope.value[ index ].type
				} )
			}, $scope.Delete = function( index, $event ) {
				$scope.value.splice( index, 1 )
			}
		},
		template: '<div><div class="input-group" ng-repeat="item in value"><span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="Add($index,$event)" ng-if="!ngReadonly"><span class="glyphicon glyphicon-plus"></span></button><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:140px"  ng-disabled="ngReadonly">{{Type2String(item)}}&nbsp;<span class="caret pull-right" style="margin-top:10px" ng-if="!ngReadonly"></span><span class="sr-only">Toggle Dropdown</span></button><ul class="dropdown-menu"><li ng-click="item.type=\'work\'"><a href="">Рабочая</a></li><li ng-click="item.type=\'pers\'"><a href="">Личная</a></li></ul></span><input type="text" class="form-control" ng-model="item.email" placeholder="Введите адрес электронной почты" ng-readonly="ngReadonly"><span class="input-group-btn"  ng-if="!ngReadonly"><button class="btn btn-default" type="button" title="Удалить" ng-click="Delete($index,$event)" ng-disabled="value.length==1"><span class="glyphicon glyphicon-remove"></span></button></span></div></div>'
	}
} ), app.directive( "dxAddresses", function( $timeout ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			value: "=",
			ngReadonly: "=",
			menu: "="
		},
		link: function( $scope, $element ) {
			$scope.value = $scope.value || [ {
				type: "home"
			} ], $scope.Type2String = function( item ) {
				if ( item.type == undefined ) return "Другое";
				for ( var i = 0; i < $scope.items.length; i++ )
					if ( $scope.items[ i ].id == item.type ) return $scope.items[ i ].name;
				return "Другое"
			}, $scope.Add = function( index, $event ) {
				$scope.value.splice( index + 1, 0, {
					type: $scope.value[ index ].type
				} )
			}, $scope.Delete = function( index, $event ) {
				$scope.value.splice( index, 1 )
			}, $scope.Def = function() {
				$scope.items = [ {
					id: "home",
					name: "Домашний"
				}, {
					id: "leg",
					name: "Прописка"
				}, {
					id: "reg",
					name: "Регистрация"
				} ]
			}, $scope.$watch( "menu", function( value ) {
				if ( value == undefined ) {
					$scope.Def();
					return
				}
				if ( value == "off" ) {
					$scope.items = [];
					return
				}
				$scope.items = [];
				for ( var key in value )
					if ( value.hasOwnProperty( key ) ) {
						var t = value[ key ].split( "#" );
						t.length == 1 ? $scope.items.push( {
							id: key,
							name: value[ key ]
						} ) : $scope.items.push( {
							id: key,
							name: t[ 0 ]
						} )
					}
			} ), $scope.Def()
		},
		template: '<div><div class="input-group" ng-repeat="item in value"><span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="Add($index,$event)"  ng-if="!ngReadonly"><span class="glyphicon glyphicon-plus"></span></button><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:140px"  ng-disabled="ngReadonly">{{Type2String(item)}}&nbsp;<span class="caret pull-right" style="margin-top:10px" ng-if="!ngReadonly"></span><span class="sr-only">Toggle Dropdown</span></button><ul class="dropdown-menu"><li ng-repeat="m in items" ng-click="item.type=m.id" ><a href="">{{m.name}}</a></li></ul></span><input type="text" class="form-control" ng-model="item.address" placeholder="Введите адрес " ng-readonly="ngReadonly"><span class="input-group-btn" ng-if="!ngReadonly"><button class="btn btn-default" type="button" title="Удалить" ng-click="Delete($index,$event)" ng-disabled="value.length==1"><span class="glyphicon glyphicon-remove"></span></button></span></div></div>'
	}
} ), app.directive( "dxDatepicker", function() {
	return {
		restrict: "E",
		replace: !0,
		require: "^ngModel",
		scope: {
			value: "=ngModel",
			width: "@",
			placeholder: "@",
			readonly: "=ngReadonly"
		},
		link: function( $scope, element ) {
			$scope.width == undefined && ( $scope.width = "100%" ), $scope.open = function( $event ) {
				$event.preventDefault(), $event.stopPropagation(), $scope.opened = !0
			}
		},
		template: '<div class="input-group disabled"><input type="text" class="form-control" ng-model="value" uib-datepicker-popup="dd.MM.yyyy" is-open="opened" show-button-bar="true" placeholder="{{placeholder}}" style="width:{{width}}"  ng-readonly="readonly" close-text="Выбрать" current-text="Сегодня" clear-text="Очистить"/><span class="input-group-btn"><button type="button" class="btn btn-default form-control" ng-click="open($event)" ng-disabled="readonly"><i class="glyphicon glyphicon-calendar"></i></button></span></div>'
	}
} ), app.directive( "dxDateTime", function() {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			date: "=",
			time: "=",
			readonly: "="
		},
		link: function( $scope, element ) {
			$scope.DateTimeToString = function( date ) {
				return date == undefined || date == null ? "" : helpers.JsonDateToStringDateTime( new Date( date ) )
			}, $scope.DateToString = function( date ) {
				return date == undefined || date == null ? "" : helpers.DateToString( new Date( date ), "dd.MM.yyyy" )
			}
		},
		template: '<div class="row"><div class="col-sm-8"><dx-datepicker ng-model="date" placeholder="Дата" title="Введите крайнего срока исполнения заявки" ng-show="!readonly"></dx-datepicker><input type="text" class="form-control" value="{{DateToString(date)}}" readonly ng-show="readonly" /></div><div class="col-sm-4"><input type="text" class="form-control" placeholder="Время" ng-model="time" pattern="([01]?[0-9]|2[0-3])(:[0-5][0-9])" ng-readonly="readonly" /></div></div>'
	}
} ), app.directive( "dxFormTitle", function( $timeout, $http, $rootScope ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			title: "@"
		},
		template: '<div class="form-group"><label class="col-sm-2 control-label"></label><div class="col-sm-10"><h2>{{title}}</h2></div></div>',
		link: function( $scope, $element ) {}
	}
} ), app.directive( "dxFormFooterAddCancel", function( $timeout, $http, $rootScope ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			errorMessage: "=",
			onAdd: "&",
			onCancel: "&"
		},
		template: '<div><div class="form-group" ng-show="errorMessage!=undefined"><label class="col-sm-2 control-label"></label><div class="col-sm-10"><label class="form-control" style="color:red">{{errorMessage}}</label></div></div><div class="form-group" ><label class="col-sm-2 control-label" for="prependedInput"></label><div class="col-sm-10"><a href="#" class="btn btn-small btn-primary" style="float:left;margin-right:10px" ng-click="onAdd()">Создать</a><a href="#" class="btn btn-small btn-default" style="float:left;margin-right:10px" ng-click="onCancel()">Отмена</a></div></div></div>',
		link: function( $scope, $element ) {}
	}
} ), app.directive( "dxFormFooterSaveCancel", function( $timeout, $http, $rootScope ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			errorMessage: "=",
			onSave: "&",
			onCancel: "&"
		},
		template: '<div><div class="form-group" ng-show="errorMessage!=undefined"><label class="col-sm-2 control-label"></label><div class="col-sm-10"><label class="form-control" style="color:red">{{errorMessage}}</label></div></div><div class="form-group" ><label class="col-sm-2 control-label" for="prependedInput"></label><div class="col-sm-10"><a href="#" class="btn btn-small btn-primary" style="float:left;margin-right:10px" ng-click="onSave()">Сохранить</a><a href="#" class="btn btn-small btn-default" style="float:left;margin-right:10px" ng-click="onCancel()">Отмена</a></div></div></div>',
		link: function( $scope, $element ) {}
	}
} ), app.directive( "dxFormFooterDeleteCancel", function( $timeout, $http, $rootScope ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			errorMessage: "=",
			onDelete: "&",
			onCancel: "&"
		},
		template: '<div><div class="form-group" ng-show="errorMessage!=undefined"><label class="col-sm-2 control-label"></label><div class="col-sm-10"><label class="form-control" style="color:red">{{errorMessage}}</label></div></div><div class="form-group" ><label class="col-sm-2 control-label" for="prependedInput"></label><div class="col-sm-10"><a href="#" class="btn btn-small btn-danger" style="float:left;margin-right:10px" ng-click="onDelete()">Удалить</a><a href="#" class="btn btn-small btn-default" style="float:left;margin-right:10px" ng-click="onCancel()">Отмена</a></div></div></div>',
		link: function( $scope, $element ) {}
	}
} ), app.directive( "dxUpDown", function() {
	return {
		restrict: "E",
		replace: !0,
		transclude: !0,
		scope: {
			value: "=",
			step: "=",
			max: "=",
			min: "="
		},
		template: '<div class="input-group"><span class="input-group-btn"><button class="btn btn-default" type="button" ng-click="Down()">-</button></span><input type="text" class="form-control" ng-model="value"><span class="input-group-btn"><button class="btn btn-default" type="button"  ng-click="Up()">+</button></span></div>',
		link: function( $scope, $element ) {
			$scope._value = 0, $scope.$watch( "value", function( value ) {
				$scope._value = parseFloat( value )
			} ), $scope.Up = function() {
				$scope._value += parseFloat( parseFloat( $scope.step != undefined ? $scope.step : 1 ) ), $scope._value > parseFloat( $scope.max != undefined ? $scope.max : 100 ) && ( $scope._value = parseFloat( $scope.max != undefined ? $scope.max : 100 ) ), $scope.value = $scope._value
			}, $scope.Down = function() {
				$scope._value -= parseFloat( parseFloat( $scope.step != undefined ? $scope.step : 1 ) ), $scope._value < parseFloat( $scope.max != undefined ? $scope.min : 0 ) && ( $scope._value = parseFloat( $scope.min != undefined ? $scope.min : 0 ) ), $scope.value = $scope._value
			}
		}
	}
} ), app.directive( "dxUpDownSmall", function() {
	return {
		restrict: "E",
		replace: !0,
		transclude: !0,
		scope: {
			value: "=",
			step: "=",
			max: "=",
			min: "=",
			onChange: "&",
			fixed: "="
		},
		template: '<div class="input-group input-group-sm"><span class="input-group-btn"><button class="btn btn-default" type="button" ng-click="Down($event)">-</button></span><input type="text" class="form-control" ng-model="value"><span class="input-group-btn"><button class="btn btn-default" type="button"  ng-click="Up($event)">+</button></span></div>',
		link: function( $scope, $element ) {
			$scope._value = 0, $scope.$watch( "value", function( value ) {
				$scope._value = parseFloat( value ), $scope.value = $scope.fixed ? $scope._value.toFixed( $scope.fixed ) : $scope._value
			} ), $scope.Up = function( $event ) {
				$event != undefined && ( $event.preventDefault(), $event.stopPropagation() ), $scope._value += parseFloat( parseFloat( $scope.step != undefined ? $scope.step : 1 ) ), $scope._value > parseFloat( $scope.max != undefined ? $scope.max : 100 ) && ( $scope._value = parseFloat( $scope.max != undefined ? $scope.max : 100 ) ), $scope.value = $scope.fixed ? $scope._value.toFixed( $scope.fixed ) : $scope._value, $scope.onChange( {
					value: $scope.value
				} )
			}, $scope.Down = function( $event ) {
				$event != undefined && ( $event.preventDefault(), $event.stopPropagation() ), $scope._value -= parseFloat( parseFloat( $scope.step != undefined ? $scope.step : 1 ) ), $scope._value < parseFloat( $scope.max != undefined ? $scope.min : 0 ) && ( $scope._value = parseFloat( $scope.min != undefined ? $scope.min : 0 ) ), $scope.value = $scope.fixed ? $scope._value.toFixed( $scope.fixed ) : $scope._value, $scope.onChange( {
					value: $scope.value
				} )
			}
		}
	}
} ), app.directive( "dxFile", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			file: "=",
			onFileSelect: "&"
		},
		template: '<div class="input-group"><input type="text" class="form-control" readonly ng-model="file.name"/><input type="file" name="file" style="display:none" id="file"/><span class="input-group-btn"><button class="btn btn-default" type="button" ng-click="SelectFile()">...</button></span></div>',
		link: function( $scope, $element ) {
			$scope.SelectFile = function() {
				$element.find( ">#file" ).bind( "change", function( e ) {
					var file = e.target.files[ 0 ];
					$timeout( function() {
						$scope.file = file, $scope.onFileSelect( {
							file: file
						} )
					} ), $element.find( ">#file" ).unbind( "change" )
				} ), $element.find( ">#file" ).click()
			}
		}
	}
} ), app.directive( "dxTimeZoneSelect", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			value: "=",
			ngReadonly: "="
		},
		template: '<span><select class="form-control" ng-model="value" ng-options="item.id as item.name for item in items" ng-show="!ngReadonly"></select><input type="text" class="form-control" value="{{GetById(value).name}}"  ng-readonly="true" ng-show="ngReadonly"  /></span>',
		link: function( $scope, $element ) {
			$scope.items = [ {
				id: "Europe/Kaliningrad",
				name: "Россия/Калининград (GMT+2)"
			}, {
				id: "Europe/Moscow",
				name: "Россия/Москва(GMT+3)"
			}, {
				id: "Europe/Samara",
				name: "Россия/Самара(GMT+4)"
			}, {
				id: "Asia/Yekaterinburg",
				name: "Россия/Екатеринбург(GMT+5)"
			}, {
				id: "Asia/Omsk",
				name: "Россия/Омск(GMT+6)"
			}, {
				id: "Asia/Krasnoyarsk",
				name: "Россия/Красноярск(GMT+7)"
			}, {
				id: "Asia/Irkutsk",
				name: "Россия/Иркутск(GMT+8)"
			}, {
				id: "Asia/Yakutsk",
				name: "Россия/Якутск(GMT+9)"
			}, {
				id: "Asia/Vladivostok",
				name: "Россия/Владивосток(GMT+10)"
			}, {
				id: "Asia/Srednekolymsk",
				name: "Россия/Среднеколымск(GMT+11)"
			}, {
				id: "Asia/Kamchatka",
				name: "Россия/Камчатка(GMT+12)"
			} ], $scope.GetById = function( id ) {
				var res = $scope.items.filter( function( i ) {
					return i.id == id
				} )[ 0 ];
				return res == undefined ? {
					name: ""
				} : res
			}
		}
	}
} ), app.directive( "dxEditor", function( $timeout, $rootScope ) {
	return {
		restrict: "E",
		replace: !0,
		transclude: !0,
		scope: {
			edit: "=",
			control: "="
		},
		link: function( $scope, $element ) {
			$scope.fontNames = [ "Serif", "Sans", "Arial", "Arial Black", "Courier", "Courier New", "Comic Sans MS", "Helvetica", "Impact", "Lucida Grande", "Lucida Sans", "Tahoma", "Times", "Times New Roman", "Verdana" ];
			var editor = $element.find( "#editor" ),
				medium = new Medium( {
					autoHR: !1,
					tags: {
						innerLevel: [ "span", "b", "i", "strike", "u", "br" ]
					},
					mode: Medium.richMode,
					attributes: null,
					element: editor[ 0 ]
				} ),
				typeahead = new Medium.Typeahead( medium );
			$scope.toolbarShow = !0, $scope.bold = function( $event ) {
				Medium.activeElement = typeahead.getEditor(), typeahead.medium.invokeElement( "b", {
					title: "I'm bold!",
					style: "color: #00000"
				} ), $scope.preventDefault( $event )
			}, $scope.italic = function( $event ) {
				Medium.activeElement = typeahead.getEditor(), typeahead.medium.invokeElement( "i", {
					title: "I'm bold!",
					style: "color: #00000"
				} ), $scope.preventDefault( $event )
			}, $scope.font = function( $event, size ) {
				return Medium.activeElement = typeahead.getEditor(), typeahead.medium.invokeElement( "span", {
					style: "font-size: " + size
				} ), $scope.preventDefault( $event ), !1
			}, $scope.fontName = function( $event, name ) {
				return Medium.activeElement = typeahead.getEditor(), typeahead.medium.invokeElement( "span", {
					style: "font-family: " + name
				} ), $scope.preventDefault( $event ), !1
			}, $scope.align = function( $event, align ) {
				Medium.activeElement = typeahead.getEditor();
				var node = rangy.getSelection().getRangeAt( 0 ).startContainer;
				while ( node.nodeName !== "P" ) node = node.parentNode;
				node.style.textAlign = align, $scope.preventDefault( $event )
			}, $scope.empty = function() {
				var nodeDIV = editor[ 0 ];
				while ( nodeDIV.firstChild ) nodeDIV.removeChild( nodeDIV.firstChild );
				var sel = window.getSelection(),
					r = sel.getRangeAt( 0 ),
					t = document.createTextNode( " " ),
					p = document.createElement( "P" );
				p.appendChild( t ), sel.removeAllRanges(), nodeDIV.appendChild( p ), r.setStartBefore( t ), sel.addRange( r )
			}, $scope.preventDefault = function( $event ) {
				Medium.Utilities.preventDefaultEvent( $event )
			}, $scope.$watch( "edit", function( value ) {
				editor.html( value )
			} ), $scope.$watch( "control", function( value ) {
				if ( value == undefined ) return;
				$scope.control.SetText = function( text ) {
					editor.html( text )
				}, $scope.control.GetText = function() {
					return editor.html()
				}, $scope.control.onEndInitialization && $scope.control.onEndInitialization()
			} )
		},
		template: '<div style="width:100%;"><div id="toolbar"  data-role="editor-toolbar" data-target="" ng-show="toolbarShow" ><div class="btn-group"><a class="btn  btn-default" ng-mousedown="bold($event)" title="Bold (Ctrl/Cmd+B)"><i class="glyphicon glyphicon-bold"></i></a><a class="btn  btn-default" ng-mousedown="italic($event)" title="Italic (Ctrl/Cmd+I)"><i class="glyphicon glyphicon-italic"></i></a></div><div class="btn-group"><a ng-mousedown="align($event, \'left\')" class="btn btn-default" title="Align Left (Ctrl/Cmd+L)"><i class="glyphicon glyphicon-align-left"></i></a><a ng-mousedown="align($event, \'center\')" class="btn btn-default" title="Center (Ctrl/Cmd+E)"><i class="glyphicon glyphicon-align-center"></i></a><a ng-mousedown="align($event, \'right\')" class="btn btn-default" title="Align Right (Ctrl/Cmd+R)"><i class="glyphicon glyphicon-align-right"></i></a><a ng-mousedown="align($event, \'justify\')" class="btn btn-default" title="Justify (Ctrl/Cmd+J)"><i class="glyphicon glyphicon-align-justify"></i></a></div><div class="btn-group"><a class="btn btn-default" title="Очистить" ng-click="empty()"><i class="glyphicon glyphicon-remove"></i></a></div><div  class="pull-right" ng-transclude></div></div><div id="editor" style="height:500px;border:solid;border-width:1px;margin-top:5px" contenteditable="false" class="wysiwyg"></div><ul id="menu" class="dropdown-menu" style="position: absolute;"></ul></div>'
	}
} ), app.controller( "ModalDialogCtrl", function( $scope, $uibModalInstance, $timeout, param ) {
	$scope.param = param, param.timer && $timeout( function() {
		$uibModalInstance.close( {} )
	}, param.timer ), $scope.ok = function( param ) {
		$uibModalInstance.close( param )
	}, $scope.close = function() {
		$uibModalInstance.dismiss( "cancel" )
	}
} );
var modalDialog = function( $uibModal, param, callbackClose ) {
	var modalInstance = $uibModal.open( {
		animation: !0,
		template: param.template,
		controller: "ModalDialogCtrl",
		backdrop: "static",
		size: param.size,
		resolve: {
			param: function() {
				return param
			}
		}
	} );
	return modalInstance.result.then( function( data ) {
		callbackClose( data )
	}, function() {
		callbackClose()
	} ), param
};
app.directive( "dxModalSimpleMessage", function( $timeout, $http, $rootScope ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {},
		template: '<div><div class="modal-body"><h3>{{message}}</h3></div><div class="modal-footer"><button class="btn btn-success" ng-click="close()">Закрыть</button></div></div>',
		link: function( $scope, $element ) {
			$scope.message = $scope.$parent.param.message, $scope.close = function() {
				$scope.$parent.close()
			}, $scope.ok = function() {
				$scope.$parent.ok()
			}
		}
	}
} ), app.directive( "dxModalAlertMessage", function( $timeout, $http, $rootScope ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {},
		template: '<div><div class="modal-header" ng-if="title!=undefined"><h3 class="modal-title">{{title}}</h3></div><div class="modal-body"><h3 style="color:red">{{message}}</h3></div><div class="modal-footer"><button class="btn btn-danger" ng-click="close()">Закрыть</button></div></div>',
		link: function( $scope, $element ) {
			$scope.title = $scope.$parent.param.title, $scope.message = $scope.$parent.param.message, $scope.close = function() {
				$scope.$parent.close()
			}, $scope.ok = function() {
				$scope.$parent.ok()
			}
		}
	}
} ), app.directive( "dxModalAlertMessageYesNo", function( $timeout, $http, $rootScope ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {},
		template: '<div><div class="modal-header" ng-if="title!=undefined"><h3 class="modal-title">{{title}}</h3></div><div class="modal-body"><h3 style="color:red"  ng-if="style==\'danger\'">{{message}}</h3><h3 ng-if="style==\'primary\'">{{message}}</h3><h3 ng-if="style==\'default\'">{{message}}</h3></div><div class="modal-footer" ng-if="btnSize==\'normal\'"><button class="btn btn-danger" ng-click="Yes()" ng-if="style==\'danger\'">Да</button><button class="btn btn-primary" ng-click="Yes()" ng-if="style==\'primary\'">Да</button><button class="btn btn-default" ng-click="Yes()" ng-if="style==\'default\'">Да</button><button class="btn btn-default" ng-click="No()">Нет</button></div><div class="modal-footer" ng-if="btnSize==\'lg\'"><button class="btn btn-danger btn-lg" ng-click="Yes()" ng-if="style==\'danger\'">Да</button><button class="btn btn-primary btn-lg" ng-click="Yes()" ng-if="style==\'primary\'">Да</button><button class="btn btn-default btn-lg" ng-click="Yes()" ng-if="style==\'default\'">Да</button><button class="btn btn-default btn-lg" ng-click="No()">Нет</button></div></div>',
		link: function( $scope, $element ) {
			$scope.title = $scope.$parent.param.title, $scope.message = $scope.$parent.param.message, $scope.style = $scope.$parent.param.style || "default", $scope.btnSize = $scope.$parent.param.btnSize || "normal", $scope.Yes = function() {
				$scope.$parent.ok( !0 )
			}, $scope.No = function() {
				$scope.$parent.ok( !1 )
			}
		}
	}
} ), app.directive( "dxModalProgressFileUpload", function( $timeout, $http, $rootScope ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {},
		template: '<div><div class="modal-header" ng-if="title!=undefined"><h3 class="modal-title">{{title}}</h3></div><div class="modal-body"><div class="progress" style="height:40px"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="{{percent}}" aria-valuemin="0" aria-valuemax="100" style="width: {{percent}}%;"></div></div><h4 style="color:red" ng-if="error!=undefined">{{error}}</h4></div><div class="modal-footer"><button class="btn btn-primary" ng-click="close()">Закрыть</button></div></div>',
		link: function( $scope, $element ) {
			$scope.title = $scope.$parent.param.title, $scope.message = $scope.$parent.param.message, $scope.percent = 0, $scope.$parent.param.onProgress = function( percent ) {
				$timeout( function() {
					$scope.percent = percent
				} )
			}, $scope.$parent.param.close = function( percent ) {
				$scope.$parent.close()
			}, $scope.$parent.param.error = function( error ) {
				$timeout( function() {
					$scope.error = error
				} )
			}, $scope.close = function() {
				$scope.$parent.close()
			}, $scope.ok = function() {
				$scope.$parent.ok()
			}
		}
	}
} ), app.directive( "dxRecomendation", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			uuidTest: "=",
			save: "&",
			load: "&"
		},
		template: '<div><dx-editor control="recomendationControl"><a class="btn  btn-success " title="Сохранить" ng-click="SaveRecomendation()"><i class="glyphicon glyphicon-floppy-disk"></i></a></dx-editor></div>',
		link: function( $scope, $element, $attrs ) {
			$scope.$watch( "uuidTest", function( value ) {
				if ( value == undefined ) return;
				$scope.recomendationControl = {
					onEndInitialization: function() {
						$scope.LoadRecomendation()
					}
				}
			} ), $scope.SaveRecomendation = function() {
				$scope.save( {
					text: $scope.recomendationControl.GetText()
				} )
			}, $scope.LoadRecomendation = function() {
				$scope.load( {
					callback: function( text ) {
						$scope.recomendationControl.SetText( text )
					}
				} )
			}
		}
	}
} ), app.directive( "dxConclusion", function( $timeout, $http, $rootScope ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			edit: "=",
			control: "=",
			menuOffset: "@"
		},
		template: '﻿<div style="width:100%;">    <div id="toolbar" data-role="editor-toolbar" data-target="" ng-show="toolbarShow" style="margin:5px">        <div class="btn-group">            <a class="btn  btn-default" ng-mousedown="bold($event)" title="Bold (Ctrl/Cmd+B)"><i class="glyphicon glyphicon-bold"></i></a>            <a class="btn  btn-default" ng-mousedown="italic($event)" title="Italic (Ctrl/Cmd+I)"><i class="glyphicon glyphicon-italic"></i></a>        </div>        <div class="btn-group">            <a ng-mousedown="align($event, \'left\')" class="btn btn-default" title="Align Left (Ctrl/Cmd+L)">                <i class="glyphicon glyphicon-align-left"></i>            </a>            <a ng-mousedown="align($event, \'center\')" class="btn btn-default" title="Center (Ctrl/Cmd+E)">                <i class="glyphicon glyphicon-align-center"></i>            </a>            <a ng-mousedown="align($event, \'right\')" class="btn btn-default" title="Align Right (Ctrl/Cmd+R)">                <i class="glyphicon glyphicon-align-right"></i>            </a>            <a ng-mousedown="align($event, \'justify\')" class="btn btn-default" title="Justify (Ctrl/Cmd+J)">                <i class="glyphicon glyphicon-align-justify"></i>            </a>        </div>        <div class="btn-group" id="additional">            <a class="btn btn-default dropdown-toggle" data-toggle="dropdown" title="Шаблон"><i class="glyphicon glyphicon-tasks"></i></a>            <ul class="dropdown-menu pull-right">                <li><a ng-click="addTermine()" ng-mousedown="preventDefault($event)">Добавить термин</a></li>                <li><a ng-click="editTermins()">Список терминов</a></li>                <li><a ng-click="toggleAutoTermine()"><span class="text"><i class="glyphicon glyphicon-ok" style="margin-right:10px;" ng-style="{\'visibility\':fTermine?\'visible\':\'hidden\'}"></i>Быстрая вставка терминов</span></a></li>                <!--<li class="divider"></li>                <li ><a ng-click="replaceVariables()">Пересчет переменных</a></li>                <li><a ng-click="listVariables()">Список переменных</a></li>                <li class="divider"></li>                <li><a ng-click="addTemplate()">Добавить  шаблон</a></li>                <li><a ng-click="selectTemplate()">Выбрать шаблон</a></li>                <li><a ng-click="selectDefaultTemplate()">Шаблон по умолчанию</a></li>-->                <li class="divider"></li>                <li ng-show="control.isAutoConclusion"><a ng-click="insertAutoConclusion()">Вставить компьютерное заключение</a></li>                <li><a ng-click="empty()">Очистить заключение</a></li>            </ul>        </div>        <div class="btn-group pull-right" >            <a class="btn  btn-primary dropdown-toggle" data-toggle="dropdown" title="Сохранить" ng-if="control.noFixed==true" ng-click="SaveConclusion(false)">                <i class="glyphicon glyphicon-floppy-disk"></i>            </a>            <a class="btn  btn-primary dropdown-toggle" data-toggle="dropdown" title="Сохранить" ng-if="control.noFixed!=true">                <i class="glyphicon glyphicon-floppy-disk"></i>            </a>            <ul class="dropdown-menu" id="fonts" ng-if="control.noFixed!=true">                <li style="cursor:pointer"><a ng-click="SaveConclusion(true)">Сохранить и подтвердить заключение</a></li>                <li class="divider"></li>                <li ng-repeat="item in items" style="cursor:pointer">                    <a ng-if="$index==items.length-1" ng-click="SelectConclusion($index)"><span class="glyphicon glyphicon-ok" aria-hidden="true" style="font-size: 15px;margin-right:5px;" ng-style="{\'visibility\':selectIndex==$index?\'visible\':\'hidden\'}"></span>Черновик заключения</a>                    <a ng-if="$index!=items.length-1" ng-click="SelectConclusion($index)"><span class="glyphicon glyphicon-ok" aria-hidden="true" style="font-size: 15px;margin-right:5px;" ng-style="{\'visibility\':selectIndex==$index?\'visible\':\'hidden\'}"></span>{{item.author.first}} {{item.author.middle}} {{item.author.last}}</a>                </li>                <li class="divider"></li>                <li style="cursor:pointer"><a ng-click="SaveConclusion(false)">Сохранить черновик заключения</a></li>            </ul>        </div>    </div>    <div id=\'editor\' style="height:500px;margin:5px;border:solid;border-width:1px;" contenteditable="false" class="wysiwyg">    </div>    <ul id=\'menu\' class="dropdown-menu" style="position: absolute;"></ul></div>',
		link: function( $scope, $element ) {
			$scope.termine = {
				me: [],
				all: []
			}, $scope.template = {
				me: [],
				all: []
			}, $scope.fTermine = !0, $scope.$watch( "control", function( value ) {
				if ( value == undefined ) return;
				root.GetState( {
					$http: $http,
					data: {
						uuid: [ $scope.control.getUserUuid(), $scope.control.getSharedTerminUuid() ],
						name: "rest.conclusion.termine"
					},
					success: function( state ) {
						state.rows != undefined && ( $scope.termine.me = state.rows.filter( function( i ) {
							return i.uuid == $scope.control.getUserUuid()
						} )[ 0 ], $scope.termine.me = $scope.termine.me ? $scope.termine.me.param : [], $scope.termine.all = state.rows.filter( function( i ) {
							return i.uuid == $scope.control.getSharedTerminUuid()
						} )[ 0 ], $scope.termine.all = $scope.termine.all ? $scope.termine.all.param : [] )
					}
				} ), root.GetState( {
					$http: $http,
					data: {
						uuid: [ $scope.control.getUserUuid(), $scope.control.getSharedTerminUuid() ],
						name: "rest.conclusion.template"
					},
					success: function( state ) {
						state.rows != undefined && ( $scope.template.me = state.rows.filter( function( i ) {
							return i.uuid == $scope.control.getUserUuid()
						} )[ 0 ], $scope.template.me = $scope.template.me ? $scope.template.me.param : [], $scope.template.all = state.rows.filter( function( i ) {
							return i.uuid == $scope.control.getSharedTerminUuid()
						} )[ 0 ], $scope.template.all = $scope.template.all ? $scope.template.all.param : [] )
					}
				} )
			} ), $scope.fontNames = [ "Serif", "Sans", "Arial", "Arial Black", "Courier", "Courier New", "Comic Sans MS", "Helvetica", "Impact", "Lucida Grande", "Lucida Sans", "Tahoma", "Times", "Times New Roman", "Verdana" ];
			var editor = $element.find( "#editor" ),
				medium = new Medium( {
					autoHR: !1,
					tags: {
						innerLevel: [ "span", "b", "i", "strike", "u", "br" ]
					},
					mode: Medium.richMode,
					attributes: null,
					element: editor[ 0 ]
				} ),
				typeahead = new Medium.Typeahead( medium, $scope.menuOffset );
			$scope.toolbarShow = !0, typeahead.getTerms = function( query, process ) {
				$scope.fTermine == 1 && query.length >= 3 && process( query, $scope.termine.me.concat( $scope.termine.all ) )
			}, $scope.bold = function( $event ) {
				Medium.activeElement = typeahead.getEditor(), typeahead.medium.invokeElement( "b", {
					title: "I'm bold!",
					style: "color: #00000"
				} ), $scope.preventDefault( $event )
			}, $scope.italic = function( $event ) {
				Medium.activeElement = typeahead.getEditor(), typeahead.medium.invokeElement( "i", {
					title: "I'm bold!",
					style: "color: #00000"
				} ), $scope.preventDefault( $event )
			}, $scope.font = function( $event, size ) {
				return Medium.activeElement = typeahead.getEditor(), typeahead.medium.invokeElement( "span", {
					style: "font-size: " + size
				} ), $scope.preventDefault( $event ), !1
			}, $scope.fontName = function( $event, name ) {
				return Medium.activeElement = typeahead.getEditor(), typeahead.medium.invokeElement( "span", {
					style: "font-family: " + name
				} ), $scope.preventDefault( $event ), !1
			}, $scope.align = function( $event, align ) {
				Medium.activeElement = typeahead.getEditor();
				var node = rangy.getSelection().getRangeAt( 0 ).startContainer;
				while ( node.nodeName !== "P" ) node = node.parentNode;
				node.style.textAlign = align, $scope.preventDefault( $event )
			}, $scope.empty = function() {
				var nodeDIV = editor[ 0 ];
				while ( nodeDIV.firstChild ) nodeDIV.removeChild( nodeDIV.firstChild );
				var sel = window.getSelection(),
					r = sel.getRangeAt( 0 ),
					t = document.createTextNode( " " ),
					p = document.createElement( "P" );
				p.appendChild( t ), sel.removeAllRanges(), nodeDIV.appendChild( p ), r.setStartBefore( t ), sel.addRange( r )
			}, $scope.addTermine = function() {
				var term = "";
				window.getSelection ? term = window.getSelection().toString() : document.selection && document.selection.type != "Control" && ( term = document.selection.createRange().text ), $rootScope.modalDialog( {
					termine: term,
					rights: $scope.control.isEditSharedTermins() ? "all" : "me",
					visibility: $scope.control.isEditSharedTermins() ? "all" : "me",
					template: "<dx-modal-add-termine><dx-modal-add-termine>"
				}, function( data ) {
					if ( data == undefined ) return;
					var index = $scope.termine[ data.visibility ].findIndex( function( i, n ) {
						return i.toLowerCase() == data.termine.toLowerCase()
					} );
					if ( index >= 0 ) return;
					$scope.termine[ data.visibility ].push( data.termine ), data.visibility == "me" ? root.SetState( {
						$http: $http,
						data: {
							uuid: $scope.control.getUserUuid(),
							name: "rest.conclusion.termine",
							param: $scope.termine[ data.visibility ]
						}
					} ) : data.visibility == "all" && root.SetState( {
						$http: $http,
						data: {
							uuid: $scope.control.getSharedTerminUuid(),
							name: "rest.conclusion.termine",
							param: $scope.termine[ data.visibility ]
						}
					} )
				} )
			}, $scope.editTermins = function() {
				$rootScope.modalDialog( {
					termins: $scope.termine,
					rights: $scope.control.isEditSharedTermins() ? "all" : "me",
					template: "<dx-modal-edit-termine><dx-modal-edit-termine>"
				}, function( data ) {
					$scope.control.isEditSharedTermins() == 1 && root.SetState( {
						$http: $http,
						data: {
							uuid: $scope.control.getSharedTerminUuid(),
							name: "rest.conclusion.termine",
							param: $scope.termine.all
						}
					} ), root.SetState( {
						$http: $http,
						data: {
							uuid: $scope.control.getUserUuid(),
							name: "rest.conclusion.termine",
							param: $scope.termine.me
						}
					} )
				} )
			}, $scope.toggleAutoTermine = function() {
				$scope.fTermine = $scope.fTermine ? !1 : !0
			}, $scope.insertAutoConclusion = function() {
				$scope.source.sindrom( {
					nMathQRS: $scope.analize.nMathQRS,
					qrs: $scope.analize.qrs,
					summary: $scope.analize.summary,
					table: $scope.analize.table
				}, function( conclusion ) {
					var html = "";
					conclusion.map( function( i ) {
						html += "<p>" + ( i != null ? i : "" ) + "</p>"
					} ), editor.html( html )
				} )
			}, $scope.preventDefault = function( $event ) {
				Medium.Utilities.preventDefaultEvent( $event )
			}, $scope.$watch( "edit", function( value ) {
				editor.html( value )
			} ), $scope.items = [], $scope.setSource = function( source ) {
				$scope.source = source, $scope.source.loadConclusion( 0, function( conclusion ) {
					$timeout( function() {
						$scope.items = conclusion, $scope.items.length == 0 && $scope.items.push( {
							text: editor.html()
						} ), $scope.SelectConclusion( 0 )
					} )
				} )
			}, $scope.$watch( "control", function( value ) {
				if ( value == undefined ) return;
				value.protocol && $scope.setSource( value.protocol ), $scope.control.getConclusion = function() {
					return $scope.items[ $scope.selectIndex ].editor = editor.html().replace( /<p><br><\/p>/g, "" ).replace( /<br>/g, "" ), $scope.items[ $scope.selectIndex ]
				}, $scope.control.setAnalize = function( analize, callback ) {
					$scope.analize = analize
				}, $scope.control.setSource = $scope.setSource, $scope.control.onEndInitialization && $scope.control.onEndInitialization()
			} ), $scope.SaveConclusion = function( fixed ) {
				$scope.source.saveConclusion( editor.html(), fixed, $rootScope.auth.user, $rootScope.auth.current.clinic, function( result ) {
					result.success == 1 ? ( fixed ? ( $scope.items.unshift( {
						text: editor.html(),
						date: new Date,
						author: $rootScope.auth.user
					} ), $scope.selectIndex = 0 ) : $scope.items[ $scope.items.length - 1 ].text = editor.html(), $rootScope.modalDialog( {
						message: "Заключение сохранено на сервере!",
						timer: 3e3,
						template: "<dx-modal-simple-message><dx-modal-simple-message>"
					} ) ) : $rootScope.modalDialog( {
						message: result.message,
						template: "<dx-modal-alert-message><dx-modal-alert-message>"
					} )
				} )
			}, $scope.selectIndex = 0, $scope.SelectConclusion = function( index ) {
				$scope.selectIndex = index, editor.html( $scope.items[ index ].text )
			}, $scope.selectTemplate = function() {
				$rootScope.modalDialog( {
					template: "<dx-modal-select-template><dx-modal-select-template>"
				}, function( data ) {} )
			}, $scope.addTemplate = function() {
				var term = "";
				$rootScope.modalDialog( {
					data: {
						name: "Новый шаблон",
						visibility: $scope.control.isEditSharedTermins() ? "all" : "me"
					},
					rights: $scope.control.isEditSharedTermins() ? "all" : "me",
					template: "<dx-modal-add-template><dx-modal-add-template>"
				}, function( data ) {
					if ( data == undefined ) return;
					$scope.template[ data.visibility ].push( {
						name: data.name,
						template: editor.html()
					} ), data.visibility == "me" ? root.SetState( {
						$http: $http,
						data: {
							uuid: $scope.control.getUserUuid(),
							name: "rest.conclusion.template",
							param: $scope.template[ data.visibility ]
						}
					} ) : data.visibility == "all" && root.SetState( {
						$http: $http,
						data: {
							uuid: "26625874-6673-7800-0000-444444444444",
							name: "rest.conclusion.template",
							param: $scope.template[ data.visibility ]
						}
					} )
				} )
			}
		}
	}
} ), app.directive( "dxModalComputerConclusion", function( $timeout, $http, $rootScope ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {},
		template: '<div><div class="modal-header" ><h3 class="modal-title">Компьютерное заключение</h3></div><div class="modal-body" style="color:blue;max-height:400px;overflow-y:auto" ng-bind-html="conclusion"></div><div class="modal-footer"><button class="btn btn-primary" ng-click="close()">Закрыть</button></div></div>',
		link: function( $scope, $element ) {
			$scope.conclusion = $scope.$parent.param.conclusion, $scope.close = function() {
				$scope.$parent.close()
			}, $scope.ok = function() {
				$scope.$parent.ok()
			}
		}
	}
} ), app.directive( "dxModalAddTermine", function( $timeout, $http, $rootScope ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {},
		template: '<div><div class="modal-header"><h3 class="modal-title">Добавить термин</h3></div><div class="modal-body"><div class="form-horizontal" role="form"><dx-field name="Термин" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.termine" /></dx-field><dx-field name="Видимость" width-label="col-sm-2" width-value="col-sm-10"><select class="form-control" ng-model="edit.visibility" ng-options="item.id as item.name for item in visibilityItems"></select></dx-field></div></div><div class="modal-footer"><button class="btn btn-primary" ng-click="Add()">Добавить</button><button class="btn btn-default" ng-click="Close()">Закрыть</button></div></div>',
		link: function( $scope, $element ) {
			$scope.edit = {}, $scope.edit.termine = $scope.$parent.param.termine, $scope.edit.visibility = $scope.$parent.param.visibility || "me", $scope.rights = $scope.$parent.param.rights || "me", $scope.visibilityItems = $scope.rights == "all" ? [ {
				id: "me",
				name: "только для меня"
			}, {
				id: "all",
				name: "для всех"
			} ] : [ {
				id: "me",
				name: "только для меня"
			} ], $scope.Close = function() {
				$scope.$parent.close()
			}, $scope.Add = function() {
				$scope.$parent.ok( $scope.edit )
			}
		}
	}
} ), app.directive( "dxModalAddTemplate", function( $timeout, $http, $rootScope ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {},
		template: '<div><div class="modal-header"><h3 class="modal-title">Добавить шаблон</h3></div><div class="modal-body"><div class="form-horizontal" role="form"><dx-field name="Название" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="template.name" /></dx-field><dx-field name="Видимость" width-label="col-sm-2" width-value="col-sm-10"><select class="form-control" ng-model="template.visibility" ng-options="item.id as item.name for item in visibilityItems"></select></dx-field></div></div><div class="modal-footer"><button class="btn btn-primary" ng-click="Add()">Добавить</button><button class="btn btn-default" ng-click="Close()">Закрыть</button></div></div>',
		link: function( $scope, $element ) {
			$scope.template = $scope.$parent.param.data, $scope.template.visibility = $scope.$parent.param.data.visibility || "me", console.log( $scope.template ), $scope.rights = $scope.$parent.param.rights || "me", $scope.visibilityItems = $scope.rights == "all" ? [ {
				id: "me",
				name: "только для меня"
			}, {
				id: "all",
				name: "для всех"
			} ] : [ {
				id: "me",
				name: "только для меня"
			} ], $scope.Close = function() {
				$scope.$parent.close()
			}, $scope.Add = function() {
				$scope.$parent.ok( $scope.template )
			}
		}
	}
} ), app.directive( "dxModalEditTermine", function( $timeout, $http, $rootScope ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {},
		template: '<div><div class="modal-header"><h3 class="modal-title">Cписок терминов</h3></div><div class="modal-body"><ul class="nav nav-tabs"><li class="active"><a data-toggle="tab" href="#terminePanel1">Мои термины</a></li><li ><a data-toggle="tab" href="#terminePanel2">Общие</a></li></ul><div class="tab-content" style="margin-top:20px;"><div id="terminePanel1" class="tab-pane fade in active"><div class="row" style="margin-bottom:5px;"><div class="col-xs-12"><div class="input-group"><span class="input-group-btn"><button class="btn btn-success" type="button" title="Добавить" ng-click="Add(\'me\',add)"><span class="glyphicon glyphicon-plus"></span></button></span><input type="text" class="form-control" ng-model="add"/></div></div></div><div style="overflow-y:auto;overflow-x:hidden;height:200px"><div class="row" ng-repeat="item in termins.me" ><div class="col-xs-12" ng-show="rowEdit.me==-1"><div class="input-group input-group-sm"><input type="text" class="form-control" ng-model="item"  readonly/><span class="input-group-btn"><button class="btn btn-default" type="button" title="Сохранить" ng-click="Edit($index,\'me\',$event)"><span class="glyphicon glyphicon-edit" aria-hidden="true"  title="Редактировать"></span></button><button class="btn btn-default" type="button" title="Сохранить" ng-click="Delete($index,\'me\',$event)"><span class="glyphicon glyphicon-remove" aria-hidden="true"   title="Удалить"></span></button></span></div></div><div class="col-xs-12" ng-show="rowEdit.me==$index"><div class="input-group input-group-sm"><input type="text" class="form-control" ng-model="item" /><span class="input-group-btn"><button class="btn btn-default" type="button" title="Сохранить" ng-click="EditFinish($index,\'me\',item)"><span class="glyphicon glyphicon-floppy-disk"></span></button></span></div></div></div></div></div><div id="terminePanel2" class="tab-pane fade"><div class="row" style="margin-bottom:5px;"><div class="col-xs-12" ng-show="rights==\'all\'"><div class="input-group"><span class="input-group-btn"><button class="btn btn-success" type="button" title="Добавить" ng-click="Add(\'all\',add)"><span class="glyphicon glyphicon-plus"></span></button></span><input type="text"  class="form-control" ng-model="add"/></div></div></div><div style="overflow-y:auto;overflow-x:hidden;height:200px"><div class="row" ng-repeat="item in termins.all" ><div class="col-xs-12" ng-show="rowEdit.all==-1"><input type="text" class="form-control input-sm" ng-model="item"  readonly ng-show="rights!=\'all\'"/><div class="input-group input-group-sm"  ng-show="rights==\'all\'"><input type="text" class="form-control" ng-model="item"  readonly/><span class="input-group-btn" ><button class="btn btn-default" type="button" title="Сохранить" ng-click="Edit($index,\'all\',$event)"><span class="glyphicon glyphicon-edit" aria-hidden="true"  title="Редактировать"></span></button><button class="btn btn-default" type="button" title="Сохранить" ng-click="Delete($index,\'all\',$event)"><span class="glyphicon glyphicon-remove" aria-hidden="true"   title="Удалить"></span></button></span></div></div><div class="col-xs-12" ng-show="rowEdit.all==$index"><div class="input-group input-group-sm"><input type="text" class="form-control" ng-model="item" /><span class="input-group-btn"><button class="btn btn-default" type="button" title="Сохранить" ng-click="EditFinish($index,\'all\',item)"><span class="glyphicon glyphicon-floppy-disk"></span></button></span></div></div></div></div></div></div></div><div class="modal-footer"><button class="btn btn-default" ng-click="Close()">Закрыть</button></div></div>',
		link: function( $scope, $element ) {
			$scope.add = "", $scope.termins = $scope.$parent.param.termins, $scope.rights = $scope.$parent.param.rights || "me", $scope.rowEdit = {
				me: -1,
				all: -1
			}, $scope.Close = function() {
				$scope.$parent.close()
			}, $scope.Add = function( type, item ) {
				if ( item.length == 0 ) return;
				var i = $scope.termins.all.findIndex( function( i, n ) {
					return i.toLowerCase() == item.toLowerCase()
				} );
				if ( i >= 0 ) return;
				if ( type == "me" ) {
					i = $scope.termins.me.findIndex( function( i, n ) {
						return i.toLowerCase() == item.toLowerCase()
					} );
					if ( i >= 0 ) return
				}
				$scope.termins[ type ].push( item ), $scope.add = ""
			}, $scope.Edit = function( $index, type, $event ) {
				$scope.rowEdit[ type ] = $index
			}, $scope.EditFinish = function( $index, type, item ) {
				$scope.rowEdit[ type ] = -1, $scope.termins[ type ][ $index ] = item
			}, $scope.Delete = function( $index, type, $event ) {
				$scope.termins[ type ].splice( $index, 1 )
			}
		}
	}
} ), app.directive( "dxScaleSelect", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			scale: "="
		},
		template: '<select class="form-control" ng-model="scale" ng-options="item.id as item.name for item in items" ></select>',
		link: function( $scope, $element ) {
			$scope.items = [ {
				id: 25,
				name: "2.5 мм/мВ"
			}, {
				id: 50,
				name: "5 мм/мВ"
			}, {
				id: 100,
				name: "10 мм/мВ"
			}, {
				id: 200,
				name: "20 мм/мВ"
			}, {
				id: 400,
				name: "40 мм/мВ"
			} ]
		}
	}
} ), app.directive( "dxSpeedSelect", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			speed: "="
		},
		template: '<select class="form-control" ng-model="speed" ng-options="item.id as item.name for item in items" ></select>',
		link: function( $scope, $element ) {
			$scope.items = [ {
				id: 625,
				name: "6.25 мм/сек"
			}, {
				id: 1250,
				name: "12.5 мм/сек"
			}, {
				id: 2500,
				name: "25 мм/сек"
			}, {
				id: 5e3,
				name: "50 мм/сек"
			}, {
				id: 1e4,
				name: "100 мм/сек"
			} ]
		}
	}
} ), app.directive( "dxPaceMakerDrawSelect", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			type: "="
		},
		template: '<select class="form-control" ng-model="type" ng-options="item.id as item.name for item in items" ></select>',
		link: function( $scope, $element ) {
			$scope.items = [ {
				id: "asis",
				name: "Выводить как есть"
			}, {
				id: "10mm",
				name: "Выводить 10 мм"
			} ]
		}
	}
} ), app.directive( "dxScale", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			scale: "=",
			onChanged: "&"
		},
		template: '<div style="width:150px;text-align:center;opacity:0.9"><span class="glyphicon glyphicon-minus-sign" aria-hidden="true" style="float:left;cursor:pointer;font-size: 25px;" title="Уменьшить масштаб" ng-click="ScaleDown()"></span><label style="display: inline-block;margin:0 auto;width:100px;vertical-align:baseline">{{items[select].name}} </label><span class="glyphicon glyphicon-plus-sign" aria-hidden="true" style="float:right;cursor:pointer;font-size: 25px;" title="Увеличить масштаб" ng-click="ScaleUp()"></span></div>',
		link: function( $scope, $element ) {
			$scope.items = [ {
				id: 25,
				name: "2.5 мм/мВ"
			}, {
				id: 50,
				name: "5 мм/мВ"
			}, {
				id: 100,
				name: "10 мм/мВ"
			}, {
				id: 200,
				name: "20 мм/мВ"
			}, {
				id: 400,
				name: "40 мм/мВ"
			} ], $scope.select = 2, $scope.ScaleUp = function() {
				$scope.select != $scope.items.length - 1 && $scope.select++, $timeout( function() {
					$scope.scale = $scope.items[ $scope.select ].id, $scope.onChanged( {
						scale: $scope.scale
					} )
				} )
			}, $scope.ScaleDown = function() {
				$scope.select != 0 && $scope.select--, $timeout( function() {
					$scope.scale = $scope.items[ $scope.select ].id, $scope.onChanged( {
						scale: $scope.scale
					} )
				} )
			}, $scope.$watch( "scale", function( value ) {
				for ( var i = 0; i < $scope.items.length; i++ )
					if ( value == $scope.items[ i ].id ) {
						$scope.select = i, $timeout( function() {} );
						break
					}
			} )
		}
	}
} ), app.directive( "dxFilter", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			value: "=",
			freq: "=",
			onChanged: "&"
		},
		template: '<div style="width:120px;text-align:center;opacity:0.9"><span class="glyphicon glyphicon-minus-sign" aria-hidden="true" style="float:left;cursor:pointer;font-size: 25px;" title="Другой фильтр" ng-click="FilterDown()"></span><label style="display: inline-block;margin:0 auto;width:70px;vertical-align:baseline">{{items[indexSelect].name}} </label><span class="glyphicon glyphicon-plus-sign" aria-hidden="true" style="float:right;cursor:pointer;font-size: 25px;" title="Другой фильтр" ng-click="FilterUp()"></span></div>',
		link: function( $scope, $element ) {
			$scope.items = [], $scope.indexSelect = 0, $scope.FilterUp = function() {
				$scope.indexSelect != $scope.items.length - 1 ? $scope.indexSelect++ : $scope.indexSelect = 0, $timeout( function() {
					$scope.value = $scope.items[ $scope.indexSelect ].id, $scope.onChanged( {
						value: $scope.value
					} )
				} )
			}, $scope.FilterDown = function() {
				$scope.indexSelect != 0 ? $scope.indexSelect-- : $scope.indexSelect = $scope.items.length - 1, $timeout( function() {
					$scope.value = $scope.items[ $scope.indexSelect ].id, $scope.onChanged( {
						value: $scope.value
					} )
				} )
			}, $scope.$watch( "value", function( value ) {
				for ( var i = 0; i < $scope.items.length; i++ )
					if ( value.toString() == $scope.items[ i ].id ) {
						$scope.indexSelect = i, $timeout( function() {} );
						break
					}
			} ), $scope.$watch( "freq", function( value ) {
				$scope.items = [];
				if ( value == undefined ) return;
				if ( window.ecgjs.filter[ value ] == undefined ) return;
				window.ecgjs.filter[ value ].map( function( f ) {
					$scope.items.push( {
						id: f.id,
						name: f.name
					} )
				} );
				if ( $scope.value == undefined ) return;
				for ( var i = 0; i < $scope.items.length; i++ )
					if ( $scope.value.toString() == $scope.items[ i ].id ) {
						$scope.indexSelect = i, $timeout( function() {} );
						break
					}
			} )
		}
	}
} ), app.directive( "dxAds", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			value: "=",
			freq: "=",
			onChanged: "&"
		},
		template: '<div style="width:150px;text-align:center;opacity:0.9"><span class="glyphicon glyphicon-minus-sign" aria-hidden="true" style="float:left;cursor:pointer;font-size: 25px;" title="Изменить стабилизацию" ng-click="AdsDown()"></span><label style="display: inline-block;margin:0 auto;width:100px;vertical-align:baseline">{{items[indexSelect].name}} </label><span class="glyphicon glyphicon-plus-sign" aria-hidden="true" style="float:right;cursor:pointer;font-size: 25px;" title="Изменить стабилизацию" ng-click="AdsUp()"></span></div>',
		link: function( $scope, $element ) {
			$scope.items = [], $scope.indexSelect = 0, $scope.AdsUp = function() {
				$scope.indexSelect != $scope.items.length - 1 ? $scope.indexSelect++ : $scope.indexSelect = 0, $timeout( function() {
					$scope.value = $scope.items[ $scope.indexSelect ].id, $scope.onChanged( {
						value: $scope.value
					} )
				} )
			}, $scope.AdsDown = function() {
				$scope.indexSelect != 0 ? $scope.indexSelect-- : $scope.indexSelect = $scope.items.length - 1, $timeout( function() {
					$scope.value = $scope.items[ $scope.indexSelect ].id, $scope.onChanged( {
						value: $scope.value
					} )
				} )
			}, $scope.$watch( "value", function( value ) {
				for ( var i = 0; i < $scope.items.length; i++ )
					if ( value.toString() == $scope.items[ i ].id ) {
						$scope.indexSelect = i, $timeout( function() {} );
						break
					}
			} ), $scope.$watch( "freq", function( value ) {
				$scope.items = [];
				if ( value == undefined ) return;
				if ( window.ecgjs.ads[ value ] == undefined ) return;
				window.ecgjs.ads[ value ].map( function( f ) {
					$scope.items.push( {
						id: f.id,
						name: f.name
					} )
				} );
				if ( $scope.value == undefined ) return;
				for ( var i = 0; i < $scope.items.length; i++ )
					if ( $scope.value == $scope.items[ i ].id ) {
						$scope.indexSelect = i, $timeout( function() {} );
						break
					}
			} )
		}
	}
} ), app.directive( "dxSpeed", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			speed: "=",
			onChanged: "&"
		},
		template: '<div style="width:150px;text-align:center;opacity:0.9"><span class="glyphicon glyphicon-minus-sign" aria-hidden="true" style="float:left;cursor:pointer;font-size: 25px;" title="Уменьшить скорость" ng-click="Down($event)"></span><label style="display: inline-block;margin:0 auto;width:100px;vertical-align:baseline">{{items[select].name}} </label><span class="glyphicon glyphicon-plus-sign" aria-hidden="true" style="float:right;cursor:pointer;font-size: 25px;" title="Увеличить скорость" ng-click="Up($event)"></span></div>',
		link: function( $scope, $element ) {
			$scope.items = [ {
				id: 625,
				name: "6.25 мм/сек"
			}, {
				id: 1250,
				name: "12.5 мм/сек"
			}, {
				id: 2500,
				name: "25 мм/сек"
			}, {
				id: 5e3,
				name: "50 мм/сек"
			}, {
				id: 1e4,
				name: "100 мм/сек"
			} ], $scope.select = 2, $scope.Up = function( $event ) {
				$event.preventDefault(), $event.stopPropagation(), $scope.select != $scope.items.length - 1 && $scope.select++, $timeout( function() {
					$scope.speed = $scope.items[ $scope.select ].id, $scope.onChanged( {
						speed: $scope.speed
					} )
				} )
			}, $scope.Down = function( $event ) {
				$event.preventDefault(), $event.stopPropagation(), $scope.select != 0 && $scope.select--, $timeout( function() {
					$scope.speed = $scope.items[ $scope.select ].id, $scope.onChanged( {
						speed: $scope.speed
					} )
				} )
			}, $scope.$watch( "speed", function( value ) {
				for ( var i = 0; i < $scope.items.length; i++ )
					if ( value == $scope.items[ i ].id ) {
						$scope.select = i, $timeout( function() {} );
						break
					}
			} )
		}
	}
} ), app.directive( "dxMeasurementModeSelect", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			state: "="
		},
		template: '<select class="form-control" ng-model="state" ng-options="item.id as item.name for item in items" ></select>',
		link: function( $scope, $element ) {
			$scope.items = [ {
				id: 0,
				name: "Выкл.изм."
			}, {
				id: 1,
				name: "Вкл.изм."
			}, {
				id: 2,
				name: "Вкл.изм.Fix"
			} ]
		}
	}
} ), app.directive( "dxFilterSelect", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			filter: "=",
			freq: "="
		},
		template: '<select class="form-control" ng-model="filter" ng-options="item.id as item.name for item in items" ></select>',
		link: function( $scope, $element ) {
			$scope.$watch( "freq", function( value ) {
				switch ( value ) {
					case 500:
						$timeout( function() {
							$scope.items = [ {
								id: "off",
								name: "Выкл"
							}, {
								id: "Filter500x35",
								name: "35 Гц"
							} ]
						} );
						break;
					case 1e3:
						$timeout( function() {
							$scope.items = [ {
								id: "off",
								name: "Выкл"
							}, {
								id: "Filter1000x30",
								name: "30 Гц"
							}, {
								id: "Filter1000x50",
								name: "50 Гц"
							} ]
						} )
				}
			} )
		}
	}
} ), app.directive( "dxAdsSelect", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			ads: "=",
			freq: "="
		},
		template: '<select class="form-control" ng-model="ads" ng-options="item.id as item.name for item in items" ></select>',
		link: function( $scope, $element ) {
			$scope.$watch( "freq", function( value ) {
				switch ( value ) {
					case 500:
						$timeout( function() {
							$scope.items = [ {
								id: "off",
								name: "Выкл"
							}, {
								id: "Ads500Low",
								name: "Low"
							}, {
								id: "Ads500High",
								name: "High"
							} ]
						} );
						break;
					case 1e3:
						$timeout( function() {
							$scope.items = [ {
								id: "off",
								name: "Выкл"
							}, {
								id: "Ads1000",
								name: "Стаб"
							} ]
						} )
				}
			} )
		}
	}
} ), app.directive( "dxEcgPrint", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		transclude: !1,
		scope: {
			source: "=",
			systemlead: "=",
			area: "=",
			begin: "=",
			speed: "=",
			scale: "=",
			filter: "=",
			ads: "=",
			resolution: "=",
			style: "=",
			caption: "@",
			sync: "="
		},
		template: "<div ></div>",
		link: function( $scope, $element ) {
			function polylineback( x, y, clip ) {
				function getpoint( minmax ) {
					var min = minmax[ 0 ],
						max = minmax[ 0 ];
					for ( var i = 0; i < minmax.length; i++ ) max < minmax[ i ] && ( max = minmax[ i ] ), min > minmax[ i ] && ( min = minmax[ i ] );
					return {
						min: min,
						max: max,
						begin: minmax[ 0 ],
						end: minmax[ minmax.length - 1 ]
					}
				}
				var last = undefined,
					id = "polyline",
					current = "",
					currentTime = 0,
					currentX = clip.dx,
					minmax = [];
				this.id = function( _id ) {
					if ( _id == undefined ) return id;
					id = _id
				}, this.push = function( sample, breaks, freq, mzr ) {
					if ( currentX <= 0 ) return;
					var style = breaks <= 80 ? $scope.style.normal : breaks <= 160 ? $scope.style.semibreak : $scope.style.break;
					last == undefined && ( last = style );
					if ( last != style ) {
						var res = '<polyline  id="' + id + '" x="' + x + '" y="' + y + '" clip_x="' + clip.x + '" clip_y="' + clip.y + '" clip_dx="' + clip.dx + '" clip_dy="' + clip.dy + '" style="' + last + '" thickness="1">[' + current.slice( 0, -1 ) + "]</polyline>";
						last = style, current = "", innerHtml += res
					}
					var tempx = clip.dx - currentTime * $scope.speed / 1e3;
					if ( tempx <= currentX ) {
						minmax.push( sample );
						var value = getpoint( minmax );
						value.min == value.max ? current += JSON.stringify( {
							x: currentX,
							y: ( value.max * $scope.scale * mzr / 1e4 ).toFixed( 2 )
						} ) + "," : current += JSON.stringify( {
							x: currentX,
							begin: ( value.begin * $scope.scale * mzr / 1e4 ).toFixed( 2 ),
							end: ( value.end * $scope.scale * mzr / 1e4 ).toFixed( 2 ),
							min: ( value.min * $scope.scale * mzr / 1e4 ).toFixed( 2 ),
							max: ( value.max * $scope.scale * mzr / 1e4 ).toFixed( 2 )
						} ) + ",", currentX -= 1 / $scope.resolution, minmax = []
					} else minmax.push( sample );
					currentTime += 1e3 / freq
				}, this.end = function() {
					if ( current.length == 0 ) return currentX;
					current.length = current.length - 1;
					var res = '<polyline  id="' + id + '" x="' + x + '" y="' + y + '" clip_x="' + clip.x + '" clip_y="' + clip.y + '" clip_dx="' + clip.dx + '" clip_dy="' + clip.dy + '" style="' + last + ' " thickness="1">[' + current.slice( 0, -1 ) + "]</polyline>";
					return innerHtml += res, currentX
				}
			}

			function polylineforward( x, y, clip ) {
				var id = "polyline",
					dxTime = clip.dx * 1e3 / $scope.speed,
					point = [];
				this.id = function( _id ) {
					if ( _id == undefined ) return id;
					id = _id
				};
				var prev = 0;
				this.push = function( tick, sample, breaks, freq, mzr ) {
					if ( tick < 0 || tick > dxTime ) return;
					var x = Math.floor( tick * $scope.speed * 100 / ( 1e3 * $scope.resolution ) ),
						y = sample * $scope.scale * mzr / 1e4;
					point[ x ] == undefined ? x != 0 ? point[ x ] = {
						x: tick * $scope.speed / 1e3,
						min: prev,
						max: prev,
						begin: prev,
						end: y,
						breaks: breaks
					} : point[ x ] = {
						x: tick * $scope.speed / 1e3,
						min: y,
						max: y,
						begin: y,
						end: y,
						breaks: breaks
					} : point[ x ].breaks = breaks, prev = point[ x ].end = y, point[ x ].max < y && ( point[ x ].max = y ), point[ x ].min > y && ( point[ x ].min = y )
				}, this.end = function() {
					var current = "",
						last = undefined;
					for ( var i = 0; i < Math.floor( clip.dx * 100 / $scope.resolution ); i++ ) {
						if ( point[ i ] == undefined && current.length != 0 ) {
							current.length = current.length - 1;
							var res = '<polyline  x="' + x + '" y="' + y + '" clip_x="' + clip.x + '" clip_y="' + clip.y + '" clip_dx="' + clip.dx + '" clip_dy="' + clip.dy + '" st="' + last + ' " thickness="1">[' + current.slice( 0, -1 ) + "]</polyline>";
							innerHtml += res, current = "", last = undefined;
							continue
						}
						if ( point[ i ] == undefined ) continue;
						var breaks = point[ i ].breaks,
							style = breaks <= 80 ? $scope.style.normal : breaks <= 160 ? $scope.style.semibreak : $scope.style.break;
						last == undefined && ( last = style );
						if ( last != style ) {
							if ( current.length != 0 ) {
								current.length = current.length - 1;
								var res = '<polyline  x="' + x + '" y="' + y + '" clip_x="' + clip.x + '" clip_y="' + clip.y + '" clip_dx="' + clip.dx + '" clip_dy="' + clip.dy + '" st="' + last + ' " thickness="1">[' + current.slice( 0, -1 ) + "]</polyline>";
								innerHtml += res, current = ""
							}
							last = style
						}
						point[ i ].min == point[ i ].max ? current += JSON.stringify( {
							x: point[ i ].x,
							y: point[ i ].max.toFixed( 2 )
						} ) + "," : current += JSON.stringify( {
							x: point[ i ].x,
							begin: point[ i ].begin.toFixed( 2 ),
							end: point[ i ].end.toFixed( 2 ),
							min: point[ i ].min.toFixed( 2 ),
							max: point[ i ].max.toFixed( 2 )
						} ) + ","
					}
					if ( current.length != 0 ) {
						current.length = current.length - 1;
						var res = '<polyline  x="' + x + '" y="' + y + '" clip_x="' + clip.x + '" clip_y="' + clip.y + '" clip_dx="' + clip.dx + '" clip_dy="' + clip.dy + '" st="' + last + ' " thickness="1">[' + current.slice( 0, -1 ) + "]</polyline>";
						innerHtml += res
					}
				}
			}
			$scope.style = $scope.style || {
				normal: "#008000 solid",
				"break": "#808080 dash",
				semibreak: "#808080 solid"
			}, $scope.style.normal = $scope.style.normal || "#008000 solid", $scope.style.break = $scope.style.break || "#808080 dash", $scope.style.semibreak = $scope.style.semibreak || "#808080 solid";
			var innerHtml = "",
				numVisible = $scope.systemlead.getNumLeads(),
				ecg = {
					lead: [],
					breaks: [],
					polyline: []
				},
				cnt = 0,
				block = undefined,
				countSample = 0;
			$scope.sync && $scope.sync.lock();
			if ( $scope.source.type == "circular" ) {
				var x, y, i = 0;
				for ( var l = 0; l < $scope.systemlead.getNumLeads(); l++ ) ecg.lead[ l ] = [], ecg.breaks[ l ] = [], x = 0, y = $scope.area.y + $scope.area.height / ( 2 * numVisible ) + $scope.area.height * i / numVisible, $element.append( '<text x="' + x + '" y="' + y + '" dx="100" dy="10" font-size="12">' + $scope.systemlead.getNameLeads( l ) + "</text>" ), i++, ecg.polyline[ l ] = new polylineback( x, y, {
					x: $scope.area.x,
					y: $scope.area.y,
					dx: $scope.area.width,
					dy: $scope.area.height
				}, 25, 10, 16 ), ecg.polyline[ l ].id( "lead" + ( l + 1 ) );
				while ( ( block = $scope.source.get( cnt++ ) ) != undefined )
					for ( var i = block.numSample - 1; i >= 0; i-- ) {
						var ch = [],
							breaks = [],
							pos = i * $scope.systemlead.getNumChannels();
						for ( var c = 0; c < $scope.systemlead.getNumChannels(); c++ ) ch[ c ] = block.ecg[ pos + c ], breaks[ c ] = block.breaks[ pos + c ];
						var result = $scope.systemlead.online( ch, breaks );
						for ( var l = 0; l < $scope.systemlead.getNumLeads(); l++ ) ecg.polyline[ l ].push( result.lead[ l ], result.breaks[ l ], block.freq, block.mzr );
						countSample++
					}
				for ( var l = 0; l < $scope.systemlead.getNumLeads(); l++ ) {
					var x = ecg.polyline[ l ].end();
					$element.find( "polyline#" + ecg.polyline[ l ].id() ).each( function( index ) {
						$( this ).attr( "x", -x )
					} )
				}
				$scope.sync && $scope.sync.unlock()
			} else $scope.source.type == "remote" && $scope.source.get( {
				begin: $scope.begin - 6e4,
				end: $scope.begin + $scope.area.width * 1e3 / $scope.speed
			}, function( data ) {
				var tempFilter = window.ecgjs.filter[ data[ 0 ].freq ].filter( function( f ) {
						return f.id == $scope.filter
					} )[ 0 ],
					tempAds = window.ecgjs.ads[ data[ 0 ].freq ].filter( function( f ) {
						return f.id == $scope.ads
					} )[ 0 ],
					filter = new window.ecgjs.filter.leads,
					ads = new window.ecgjs.ads.leads;
				tempFilter != undefined && tempAds != undefined && ( filter.init( tempFilter, $scope.systemlead ), ads.init( tempAds, $scope.systemlead ), window.ecgjs.savePaceMaker( data ), data.map( function( i ) {
					i.ecg = filter.filter( ads.ads( i.ecg ) ), i.tick -= filter.offset(), i.cdm = i.cdm.map( function( pos ) {
						return pos + filter.offset()
					} )
				} ), window.ecgjs.restorePaceMaker( data ) );
				if ( data.length == 0 ) {
					$scope.sync && $scope.sync.unlock();
					return
				}
				var x, y, i = 0,
					divider = numVisible == 12 ? 6 : numVisible;
				for ( var l = 0; l < $scope.systemlead.getNumLeads(); l++ ) ecg.lead[ l ] = [], ecg.breaks[ l ] = [], x = Math.floor( i / divider ) * $scope.area.width / 2, y = $scope.area.y + $scope.area.height / ( 2 * divider ) + $scope.area.height * ( i % divider ) / divider, innerHtml += '<text x="' + x + '" y="' + y + '" dx="100" dy="10" font-size="12">' + $scope.systemlead.getNameLeads( l ) + "</text>", i++, ecg.polyline[ l ] = new polylineforward( x, y, {
					x: x,
					y: $scope.area.y,
					dx: $scope.area.width / ( numVisible / divider ),
					dy: $scope.area.height
				} ), ecg.polyline[ l ].id( "lead" + ( l + 1 ) );
				for ( var blockCounter = 0; blockCounter < data.length; blockCounter++ ) {
					block = data[ blockCounter ];
					for ( var i = 0; i < block.numSample; i++ ) {
						var ch = [],
							breaks = [],
							pos = i * $scope.systemlead.getNumChannels();
						for ( var c = 0; c < $scope.systemlead.getNumChannels(); c++ ) ch[ c ] = block.ecg[ pos + c ], breaks[ c ] = block.breaks[ pos + c ];
						var result = $scope.systemlead.online( ch, breaks );
						for ( var l = 0; l < $scope.systemlead.getNumLeads(); l++ ) ecg.polyline[ l ].push( block.tick - $scope.begin + i * 1e3 / block.freq, result.lead[ l ], result.breaks[ l ], block.freq, block.mzr );
						countSample++
					}
				}
				for ( var l = 0; l < $scope.systemlead.getNumLeads(); l++ ) ecg.polyline[ l ].end();
				$scope.style.caption = $scope.style.caption || {
					color: "#000000",
					fontSize: 5
				}, $scope.style.caption.color = $scope.style.caption.color || "#000000", $scope.style.caption.fontSize = $scope.style.caption.fontSize || 5, innerHtml += "<text  x='0.5'  y='" + ( $scope.area.height - 2.5 ) + "' dx='" + 10 + "' align='left' color='" + $scope.style.caption.color + "' font-size='" + $scope.style.caption.fontSize + "'>" + $scope.caption + "</text>", innerHtml += "<text  x='" + ( $scope.area.width - 39 ) + "'  y='" + ( $scope.area.height - 2.5 ) + "' dx='" + 39 + "' align='right' color='" + $scope.style.caption.color + "' font-size='" + $scope.style.caption.fontSize + "'>" + $scope.speed + " мм/сек " + $scope.scale + " мм/мВ Ф. " + filter.name() + " " + ads.name() + " </text>", $element.html( innerHtml ), $scope.sync && $scope.sync.unlock()
			} )
		}
	}
} ), app.directive( "dxMenuForTrendCtg", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			range: "=",
			warning: "=",
			alarm: "="
		},
		template: '<div class="dropdown" style="padding:5px;"><a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-cog" aria-hidden="true" ></span></a><ul class="dropdown-menu " style="font-size:smaller;width:200px;padding:10px"><li><strong>Верхняя граница графика</strong><dx-up-down-small value="range.max" min="range.min" max="240" step="10"/> </li><li><strong>Верхняя граница тревог</strong><dx-up-down-small value="alarm.high" min="warning.high" max="250" step="10"/> </li><li><strong>Верхняя граница предуп-я</strong><dx-up-down-small  value="warning.high" min="warning.low" max="alarm.high"  step="10"/> </li><li><strong>Верхняя граница предуп-я</strong><dx-up-down-small value="warning.low" min="alarm.low" max="warning.high"  step="10"/> </li><li><strong>Нижняя граница тревог</strong><dx-up-down-small value="alarm.low" min="30" max="warning.low"  step="10"/> </li><li><strong>Нижняя граница графика</strong> <dx-up-down-small value="range.min" min="30" max="range.max"  step="10"/> </li></ul></div>',
		link: function( $scope, $element ) {
			$scope.root = root
		}
	}
} ), app.directive( "dxMenuForTrend", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			range: "=",
			step: "=",
			min: "=",
			max: "="
		},
		template: '<div class="dropdown" style="padding:5px;"><a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-cog" aria-hidden="true" ></span></a><ul class="dropdown-menu " style="font-size:smaller;width:200px;padding:10px"><li><strong>Верхняя граница графика</strong><dx-up-down-small value="range.max" min="range.min" max="max" step="step"/> </li><li><strong>Нижняя граница графика</strong> <dx-up-down-small value="range.min" min="min" max="range.max"  step="step"/> </li></ul></div>',
		link: function( $scope, $element ) {
			$scope.root = root
		}
	}
} ), app.directive( "dxCtgResultAntenatal", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		transclude: !0,
		scope: {
			control: "=",
			type: "@",
			analyze: "="
		},
		template: '<div><div class="row"><h4 class="col-sx-12">{{title[analyze.AnalysisType]}}</h2></div><div class="row"><table class="table col-sx-12"><thead><tr><th class="col-sx-5">Параметр</th><th class="col-sx-2">Значение</th><th class="col-sx-3">ед.</th></tr></thead><tbody><tr ng-repeat="row in rows"><td class="col-sx-5"><img ng-src="{{iconpath(row)}}" />&nbsp;&nbsp;{{row.name}}</td><td class="col-sx-2"><div ng-repeat="field in row.fields">{{humanize(analyze.Params[field])}}</div></td><td class="col-sx-3"><div ng-repeat="unit in row.units">{{unit}}</div></td></tr></tbody></table></div></div>',
		link: function( $scope, $element ) {
			$scope.title = [ "Пользовательская оценка КТГ", "Оценка КТГ Кребc/Фишер", "Оценка КТГ по директивам FIGO" ], $scope.iconChek = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAEZ0FNQQAAsY58+1GTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAFMSURBVHjapJKxSwJRHMe/T+7CQcEbBNcbHIQWF8fA8QIHN/8JB2en5xBnk2hD0NIQ0eAo4dggTQ5OIZRLYgYKUhJ3cdd9G8I80+qsLzx4fH+Pz/u93/sKeiT+oRAAQARfLl1Ur6uYWlMfIKAGswEyJxmMnkeIhWMfJj0GUue+Q83UWGqXlqZHBgI0b5pUKyqLl8XVQhBA+65NtaLSODPovDnbAXqPPUYPotRrOmfWbP2AHzB8GtLsmOxP+yTJycuEek2nWlHZfehuvmEBsByL6eM0hRRM1pO0HIv5izyFFJRX8vsW/R2M52PGD+MUUjB3nqOQgqmj1Pq7vwA+c5CIJFDeKwMAWrctAEBjvwElpPwcDv8Q569zaqZGIQWzp9nf/9cjV/CRnQgKuwXYro26UQ+UTkGPhFgatmsjrISDZZsbAFuJgLLY/FXvAwAHZ/BIJ9gotQAAAABJRU5ErkJggg==", $scope.iconCrossRed = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAMCAIAAAAyIHCzAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAOwgAADr4BlqJ8egAAAP5JREFUKFNj/P/vPwMjA5GAiUh1EGXoqp+fPQtEuIxAUf3pyZMFjo4XFi4Eqv7358/Rzs6FTk43N25EaAa6Gw6urFjRyMjYwsn57s6dVaGhQDYQTdHUhCtgRPbljw8fJiop/fzwgV1AAEgCjXRsbrYuL2diYYEaj2w20Iw7O3Y0sbJCTD3U0oKwF8xC9yUbDw/cpEdHj3578wbZxwjVQG9dXblyiafn3x8/+BUUGFlY7u7YMVlNbWNS0seHD9FD8HBb29rIyN9fvrDy8ERt3gxEnCIiQNd/ePCAV1oa3d1/f//eU1m5yNX10ZEjEOd+f//+wYEDv79/xx4mBOMVAEsEt+9dhHkvAAAAAElFTkSuQmCC", $scope.iconEmpty = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsYAAA7GAerVzZIAAAApSURBVDhPY/wPBAzkAKguxv//yDQACih2AROEIh+MGjBqAAiMGsDAAADIMg4PnzPsLAAAAABJRU5ErkJggg==", $scope.iconExclamationRed = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAIAAABbzbuTAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAOxwAADsIBReXbMwAAAKZJREFUOE9j/P/vPwMjA7EAqBakgRQA1kCKDUykmA5Si65hopISEEFMQWbDzUXX8PHBAyCCSCOzcWpg5uBg5eGBSCOzcWrgkZDgEhGBSCOz8Wngk5GBa4CzcWoAGg+3AZkN18CCFqxGyclwEWQ2Ths4BASACCKNzIZrQI/pJiZQQNf9+wckkdlQDf8Z0J2kn5AANwyZjdMGNC+hc/9jJA0CGhhIT94Awmsxl24AD10AAAAASUVORK5CYII=", $scope.iconExclamationYellow = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAIAAABiEdh4AAAAAXNSR0IArs4c6QAAAAlwSFlzAAAOxwAADsIBReXbMwAAAHJJREFUKFNj/P/vPwMpgBGkgZFoHf8ZmIhWC1WIXcPEiUpAhNUs7Bo+fnwARCRoYGbmYGXlIUEDD48EF5cIaRr4+GRI0AA0HpcN2OPh5s2NQOPV1f3RLcEVDxwcAkBEgpMWLnQEIhI06OsnABFWDbRPSwBwPiANW8e0ggAAAABJRU5ErkJggg==", $scope.iconOne = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAAlwSFlzAAAOxwAADscBOJIvdgAAAR9JREFUOE9j/P/vPwMpgBGkgZFoHUC1yBr+/ftz9erKK1dWvnlzg4WFQ0xMx8AgXlnZHWEesoYvX14sX+73/PkZNOt0dWP8/ecxMbGAxOEa/vz5MXeu1cuXF4CCqqo+cnLWP358PHq0A6IZqCcwcBFEAxNE6OzZmRDVQPDu3R0JCQMVFYRLLl9e8vDhQYgsVMOFCwvhLnn79gbQeWgOgyuAanj16gr+kPrw4QGKDf///yEyaKE2iIrq4NfAwyOBYoOOTjh+DXAFUBtMTbP5+RXgeh49Onrnzk44V1nZQ13dH8JFxPTbtzeXLfN9//4OmlXy8g6RkZvY2Hgg8YCSNH79+nLy5MRr19YCowKeNHR1o6HRjKmBcEBBbSCsEKECAF4Rg7/ZyWpAAAAAAElFTkSuQmCC", $scope.iconTwo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAAlwSFlzAAAOxwAADscBOJIvdgAAAW9JREFUOE9j/P/vPwMpgBGkgZFoHUC1yBr+/Puz8urKlVdW3nhzg4OFQ0dMJ94g3l3ZHWEesoYXX174Lfc78/wMmnUxujHz/OexMLGAxOEafvz5YTXX6sLLCxzMHNV21QoCCgIcAjvv7JxyegpQGVDPosBFEA0MQCcBwYQTExgbGYFIsEPQco4lhPH++/vINZEQ8QMPDoDU/fvPBHHAwgsLIYwPPz+ceHoCwgBaK8IlgqYAquHKqytoTk8xTPn48+OCCwsg4g8+PIAwoBr+/P+DrCHDOCNYK9h2nu2X31/QDIJq0BHVgUvU2Naoi6h7LvV88/0NXFCCRwLFhnCdcAjfRtamybHpy68vDfYNQOQg7wARhyuA2pBtmq3ArwCUACptOtj0999fZJd4KHv4q/tDRBAxffPtTd9lvnfe30FzNNCSTZGbeNh4QOJoSQNo/MSTE9deW3vn3R140ojWjYZGM6YGNLOxcKE2EFaIUAEAL3Wx6JdypRUAAAAASUVORK5CYII=", $scope.iconZero = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAAlwSFlzAAAOxwAADscBOJIvdgAAAXFJREFUOE9j/P/vPwMpgBGkgZFoHUC1yBr+/flzdeXKKytXvrlxg4WDQ0xHxyA+XtndHWEesoYvL14s9/N7fuYMmnW6MTH+8+YxsbCAxOEa/vz4MdfK6uWFC0BBcQMDk/T0X1++HOvt/friBVAEqCdw0SKIBiaIeWdnzoSo5paQiN627dTUqQ8OHozZvp0RbPDlJUseHjwIUQnVcGHhQgjfKCXl9dWrr69cub1lC6+0tJKLC0QcrgCq4dWVKxAJMW3tT0+eQNhAV0kYGEDYHx48QLHh/58/UD7EczAA9SuyCIQtqqMDYQADlEtEBMJm4+F5AfYYEPBISKDYoBMeDuED3SppbAz0uryDw++vX+/t2QMRhyuARtyPDx9mGhl9BDsUqBQYrEDGvtra93fuABnKHh7AoAPpQ464tzdvLvP1hahABkD9kZs2AZ2HrgHIBwbLyYkTr61d++7OHXjS0I2ORngdLS2hmY2FC9VAWCFCBQD5Wa7afKDy6wAAAABJRU5ErkJggg==", $scope.iconQuestion = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAAlwSFlzAAAOxwAADscBOJIvdgAAANZJREFUOE9j/P//PwORAKyQ8f8/ojWAzWUk1QYmIp0DV4Ziw8ePH/ft2/fkyZN///5JSUnZ2dmJi4sjTAS7HWHDnz9/5s2bd/nyZQEBARUVlRs3bixYsODLly9oTmCB8z99+gQ0lYWFJTAwkImJCci9ffv2/fv3dXV1kfVg9/TDhw+XLVv2+/fv1NRUSUlJqAY0J8GNuX79+qJFi4Cq3d3dEaph0lhCacuWLcCwBjrM3NwcMwyxOOngwYNAdfb29uiqcTkJf8xgcRLQBoglWAHtkwbJaQkAHrpijjQcQcUAAAAASUVORK5CYII=", $scope.rows = [ {
				name: "Длительность записи",
				units: [ "мин" ],
				fields: [ "fRecLen" ],
				mark: "RecLenMark"
			}, {
				name: "Процент потерь сигнала",
				units: [ "%" ],
				fields: [ "fLP" ],
				mark: "LPMark"
			}, {
				name: "Базальная ЧСС",
				units: [ "уд/мин" ],
				fields: [ "fBR" ],
				mark: "BRMark"
			}, {
				name: "Количество акцелераций > 10 BPM и 15 с",
				units: [ "ед" ],
				fields: [ "nAcc10" ],
				mark: "Acc10Mark"
			}, {
				name: "Количество aкцелераций > 15 BPM и 15 с",
				units: [ "ед" ],
				fields: [ "nAcc15" ],
				mark: "Acc15Mark"
			}, {
				name: "Количество децелераций ",
				units: [ "ед" ],
				fields: [ "nDec" ],
				mark: "DecMark"
			}, {
				name: "Количество децелераций > 20 BPM",
				units: [ "ед" ],
				fields: [ "nDec20" ],
				mark: "Dec20Mark"
			}, {
				name: "Количество минут высокой вариабельности",
				units: [ "мин" ],
				fields: [ "nHV" ],
				mark: "HVMark"
			}, {
				name: "Количество минут низкой вариабельности",
				units: [ "мин" ],
				fields: [ "nLV" ],
				mark: "LVMark"
			}, {
				name: "Количество минут синусоидального ритма",
				units: [ "мин" ],
				fields: [ "nSin" ],
				mark: "SinMark"
			}, {
				name: "Долговременная вариабельность (амплитуда осцилляций)",
				units: [ "мс", "уд/мин" ],
				fields: [ "fLTV", "fLTV_BPM" ],
				mark: "LTVMark"
			}, {
				name: "Частота осцилляций",
				units: [ "1/мин" ],
				fields: [ "fLTF" ],
				mark: "LTFMark"
			}, {
				name: "Кратковременная вариабельность (STV)",
				units: [ "мс", "уд/мин" ],
				fields: [ "fSTV", "fSTV_BPM" ],
				mark: "STVMark"
			}, {
				name: "Частота шевелений плода",
				units: [ "1/ч" ],
				fields: [ "fMPH" ],
				mark: "MPHMark"
			} ], $scope.humanize = function( x ) {
				return x == undefined ? "" : x == 3.4028234663852886e38 ? "---" : x == 2147483647 ? "---" : x.toFixed( 1 ).replace( /\.?0*$/, "" )
			}, $scope.iconpath = function( item ) {
				if ( $scope.analyze == undefined || $scope.analyze.Params == undefined ) return "";
				var mark = $scope.analyze.Params[ item.mark ];
				return mark == 0 ? $scope.iconEmpty : mark == 1 ? $scope.iconQuestion : mark == 2 ? $scope.iconChek : mark == 3 ? $scope.iconCrossRed : mark == 4 ? $scope.iconZero : mark == 5 ? $scope.iconOne : mark == 6 ? $scope.iconTwo : mark == 7 ? $scope.iconExclamationYellow : mark == 8 ? $scope.iconExclamationRed : $scope.iconEmpty
			}
		}
	}
} ), app.directive( "dxCtgShort", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		transclude: !0,
		scope: {
			control: "="
		},
		template: '<div style="width:100%;height:100%;user-select: none; -ms-user-select: none;" onmousedown="return false" ><canvas id="LAYER1" style="padding: 0; margin: 0; border: 0; background-color: transparent; position: absolute; background-position: initial initial; background-repeat: initial initial;"></canvas><canvas id="LAYER2" style="padding: 0; margin: 0; border: 0; background-color: transparent; position: absolute; background-position: initial initial; background-repeat: initial initial;" ></canvas><canvas id="LAYER3" style="padding: 0; margin: 0; border: 0; background-color: transparent; position: absolute; background-position: initial initial; background-repeat: initial initial;" ></canvas><div id="ctrl" style="position:relative; left:0;right:0;background-color: transparent;  background-position: initial initial; background-repeat: initial initial;"  ng-transclude></div></div>',
		link: function( $scope, $element ) {
			var domLayer1 = $element.find( "#LAYER1" ).get( 0 ),
				domLayer2 = $element.find( "#LAYER2" ).get( 0 ),
				domLayer3 = $element.find( "#LAYER3" ).get( 0 ),
				domControl = $element.find( "#ctrl" ).get( 0 ),
				grid = {
					hr: new ctgjs.hr.grid( domLayer1, "europe" ),
					ma: new ctgjs.ma.grid( domLayer1 )
				},
				trend = {
					hr: new ctgjs.hr.trend( domLayer2 ),
					ma: new ctgjs.ma.trend( domLayer2 )
				};
			$scope.resize = function() {
				$scope.width = domControl.width = domLayer1.width = domLayer2.width = domLayer3.width = $element.width(), $scope.height = domControl.height = domLayer1.height = domLayer2.height = domLayer3.height = $element.height();
				var range = grid.hr.range();
				trend.hr.range( undefined, range );
				var height = ( range.max - range.min ) * grid.hr.unit() / 20;
				grid.hr.resize( 0, 0, domLayer1.width, height ), trend.hr.resize( 0, 0, domLayer1.width, height ), range = grid.ma.range(), trend.ma.range( undefined, range ), grid.ma.resize( 0, height, domLayer1.width, ( range.max - range.min ) * grid.ma.unit() / 20 ), trend.ma.resize( 0, height, domLayer1.width, ( range.max - range.min ) * grid.ma.unit() / 20 )
			}, $scope.draw = function() {
				grid.hr.draw(), grid.ma.draw(), trend.hr.draw(), trend.ma.draw()
			}, $scope.$watch( "control", function( value ) {
				if ( value == undefined ) return;
				$scope.control.data = function( hr, ma, event ) {
					trend.hr.source( hr[ 0 ].tick, hr[ 0 ].tick, hr ), trend.hr.draw(), trend.ma.source( hr[ 0 ].tick, hr[ 0 ].tick, ma ), trend.ma.draw()
				}, $scope.control.onEndInit && $scope.control.onEndInit()
			} ), $scope.resize(), $scope.draw();
			var idInterval = setInterval( function() {
				var h = $element.height(),
					w = $element.width();
				( $scope.height != h || $scope.width != w ) && $scope.$apply( function() {
					$scope.height = h, $scope.width = w, $scope.resize(), $scope.draw()
				} )
			}, 1e3 );
			$scope.$on( "$destroy", function() {
				clearInterval( idInterval )
			} )
		}
	}
} ), app.directive( "dxCtgTimePrint", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		transclude: !1,
		scope: {
			source: "=",
			area: "=",
			speed: "=",
			style: "=",
			grid: "=",
			sync: "="
		},
		template: '<div x="{{area.x}}" y="{{area.y}}" dx="{{area.width}}" dy="{{area.height}}"></div>',
		link: function( $scope, $element ) {
			$scope.style = $scope.style || {};
			var style = JSON.parse( JSON.stringify( $scope.style ) );
			style.trend = style.trend || "#FC0FC0 solid", style.background = style.background || "#ffffff", style.time = style.time || {
				line: "#646464",
				line10: "#000000",
				text: "#000000",
				thickness: .4,
				fontSize: 5,
				begin: 0
			}, style.level = style.level || {
				line: "#646464",
				text: "#000000",
				thickness: .4,
				fontSize: 5
			}, style.caption = style.caption || {
				color: "#000000",
				fontSize: 5
			}, $scope.grid = $scope.grid || {}, $scope.sync && $scope.sync.lock(), $scope.source.get( {
				begin: $scope.grid.begin - 6e4,
				end: $scope.area.width * 6e4 / $scope.speed + $scope.grid.begin
			}, function( data ) {
				var result = window.device.bioss.angiodinfm.parse.event( data );
				$scope.grid.width = $scope.area.width, $scope.grid.speed = $scope.speed, $scope.grid.caption = $scope.caption, window.trendjs.time.print( $element, 0, $scope.grid, style, $scope.source.begin, $scope.grid.begin, result ), $scope.sync && $scope.sync.unlock()
			} ), $scope.$$postDigest( function() {} )
		}
	}
} ), app.directive( "dxCtgMeHrAeAktoPrint", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		transclude: !1,
		scope: {
			source: "=",
			area: "=",
			begin: "=",
			speed: "=",
			resolution: "=",
			style: "=",
			thickness: "=",
			grid: "=",
			caption: "=",
			sync: "="
		},
		template: '<div x="{{area.x}}" y="{{area.y}}" dx="{{area.width}}" dy="{{area.height}}"></div>',
		link: function( $scope, $element ) {
			$scope.style = $scope.style || {};
			var style = JSON.parse( JSON.stringify( $scope.style ) );
			style.hr || {}, style.hr = style.hr || {}, style.hr.alarm = style.hr.alarm || "#ffe3e3", style.hr.warning = style.hr.warning || "#ffffcc", style.hr.background = style.hr.background || "#ffffff", style.hr.thickness = $scope.thickness || .4, style.hr.trend = style.hr.trend || "#909000 solid", style.hr.time = style.hr.time || {
				line: "#646464",
				line10: "#000000",
				text: "#000000",
				thickness: .4,
				fontSize: 5,
				begin: 0
			}, style.hr.level = style.hr.level || {
				line: "#646464",
				text: "#000000",
				thickness: .4,
				fontSize: 5
			}, style.hr.caption = style.hr.caption || {
				color: "#000000",
				fontSize: 5
			}, style.me = style.me || {}, style.me.background = style.me.background || "#ffffff", style.me.caption = style.me.caption || {
				color: "#808080",
				fontSize: 5
			}, style.me.time = style.me.time || "#000000", style.ae = style.ae || {}, style.ae.background = style.ae.background || "#ffffff", style.ae.caption = style.ae.caption || {
				color: "#808080",
				fontSize: 5
			}, style.ae.time = style.ae.time || "#000000", style.akto = style.akto || {}, style.akto.time = style.akto.time || {
				line: "#646464",
				line10: "#000000",
				text: "#000000",
				thickness: .4,
				fontSize: 5,
				begin: 0
			}, style.akto.level = style.akto.level || {
				line: "#646464",
				text: "#000000",
				thickness: .4,
				fontSize: 5
			}, style.akto.caption = style.akto.caption || {
				color: "#000000",
				fontSize: 5
			}, style.akto.background = style.akto.background || "#e6e6e6", style.akto.thickness = $scope.thickness || .4, $scope.thickness != undefined, $scope.grid = $scope.grid || {}, $scope.sync && $scope.sync.lock();
			var query = {};
			query.hr = {
				begin: $scope.begin - 6e4,
				end: $scope.area.width * 6e4 / $scope.grid.speed + $scope.begin
			}, query.akto = {
				begin: $scope.begin - 6e4,
				end: $scope.area.width * 6e4 / $scope.grid.speed + $scope.begin
			}, $scope.source.get( query, function( data ) {
				var result = {};
				result.me = window.device.bioss.angiodinfm.parse.me1( data.hr ), result.ae = window.device.bioss.angiodinfm.parse.ae1( data.akto ), result.hr = window.device.bioss.angiodinfm.parse.hr1( data.hr ), result.akto = window.device.bioss.angiodinfm.parse.akto1( data.akto ), window.device.bioss.angiodinfm.hr.normalize( result.hr ), window.device.bioss.angiodinfm.akto.normalize( result.akto ), $scope.grid.me = $scope.grid.me || {}, $scope.grid.me.width = $scope.area.width, $scope.grid.me.speed = $scope.grid.speed, $scope.grid.me.caption = $scope.caption.me, window.ctgjs.event.print( $element, 0, $scope.grid.me, style.me, $scope.begin, result.me ), $scope.grid.hr = $scope.grid.hr || {}, $scope.grid.hr.width = $scope.area.width, $scope.grid.hr.speed = $scope.grid.speed, $scope.grid.hr.caption = $scope.caption.hr, window.ctgjs.hr.print[ $scope.grid.hr.system ]( $element, $scope.grid.me.height, $scope.grid.hr, style.hr, $scope.begin, result ), $scope.grid.ae.height != 0 && ( $scope.grid.ae = $scope.grid.ae || {}, $scope.grid.ae.width = $scope.area.width, $scope.grid.ae.speed = $scope.grid.speed, $scope.grid.ae.caption = $scope.caption.ae, window.ctgjs.event.print( $element, $scope.grid.me.height + $scope.grid.hr.height, $scope.grid.ae, style.ae, $scope.begin, result.ae ) ), $scope.grid.akto.height != 0 && ( $scope.grid.akto = $scope.grid.akto || {}, $scope.grid.akto.width = $scope.area.width, $scope.grid.akto.speed = $scope.grid.speed, $scope.grid.akto.caption = $scope.caption.akto, window.ctgjs.akto.print( $element, $scope.grid.me.height + $scope.grid.hr.height + $scope.grid.ae.height, $scope.grid.akto, style.akto, $scope.begin, result ) ), $scope.sync && $scope.sync.unlock()
			} ), $scope.$$postDigest( function() {} )
		}
	}
} ), app.directive( "dxCtgMaPrint", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		transclude: !1,
		scope: {
			source: "=",
			area: "=",
			speed: "=",
			resolution: "=",
			style: "=",
			thickness: "=",
			grid: "=",
			caption: "@",
			sync: "="
		},
		template: '<div x="{{area.x}}" y="{{area.y}}" dx="{{area.width}}" dy="{{area.height}}"></div>',
		link: function( $scope, $element ) {
			$scope.style = $scope.style || {};
			var style = JSON.parse( JSON.stringify( $scope.style ) );
			style.trend = style.trend || "#FC0FC0 solid", style.background = style.background || "#ffffff", style.time = style.time || {
				line: "#646464",
				line10: "#000000",
				text: "#000000",
				thickness: .4,
				fontSize: 5,
				begin: 0
			}, style.level = style.level || {
				line: "#646464",
				text: "#000000",
				thickness: .4,
				fontSize: 5
			}, style.caption = style.caption || {
				color: "#000000",
				fontSize: 5
			}, style.thickness = $scope.thickness || .4, $scope.grid = $scope.grid || {}, $scope.sync && $scope.sync.lock(), $scope.source.get( {
				begin: $scope.grid.begin - 6e4,
				end: $scope.area.width * 6e4 / $scope.speed + $scope.grid.begin
			}, function( data ) {
				var result = window.device.bioss.angiodinfm.parse.ma( data );
				$scope.grid.width = $scope.area.width, $scope.grid.speed = $scope.speed, $scope.grid.caption = $scope.caption, window.ctgjs.ma.print( $element, 0, $scope.grid, style, $scope.grid.begin, result ), $scope.sync && $scope.sync.unlock()
			} ), $scope.$$postDigest( function() {} )
		}
	}
} ), app.directive( "dxCtgHrmPrint", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		transclude: !1,
		scope: {
			source: "=",
			area: "=",
			speed: "=",
			resolution: "=",
			style: "=",
			thickness: "=",
			grid: "=",
			caption: "@",
			sync: "="
		},
		template: '<div x="{{area.x}}" y="{{area.y}}" dx="{{area.width}}" dy="{{area.height}}"></div>',
		link: function( $scope, $element ) {
			$scope.style = $scope.style || {};
			var style = JSON.parse( JSON.stringify( $scope.style ) );
			style.background = style.background || "#e6e6e6", style.time = style.time || {
				line: "#646464",
				line10: "#000000",
				text: "#000000",
				thickness: .4,
				fontSize: 5,
				begin: 0
			}, style.level = style.level || {
				line: "#646464",
				text: "#000000",
				thickness: .4,
				fontSize: 5
			}, style.caption = style.caption || {
				color: "#000000",
				fontSize: 5
			}, style.thickness = $scope.thickness || .4, $scope.grid = $scope.grid || {}, $scope.sync && $scope.sync.lock(), $scope.source.get( {
				begin: $scope.grid.begin - 6e4,
				end: $scope.area.width * 6e4 / $scope.speed + $scope.grid.begin
			}, function( data ) {
				var result = window.device.bioss.angiodinfm.parse.ecghr( data );
				$scope.grid.width = $scope.area.width, $scope.grid.speed = $scope.speed, $scope.grid.caption = $scope.caption, window.trendjs.hr.print( $element, 0, $scope.grid, style, $scope.grid.begin, result ), $scope.sync && $scope.sync.unlock()
			} ), $scope.$$postDigest( function() {} )
		}
	}
} ), app.directive( "dxCtgSpo2Print", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		transclude: !1,
		scope: {
			source: "=",
			area: "=",
			speed: "=",
			resolution: "=",
			style: "=",
			thickness: "=",
			grid: "=",
			caption: "@",
			sync: "="
		},
		template: '<div x="{{area.x}}" y="{{area.y}}" dx="{{area.width}}" dy="{{area.height}}"></div>',
		link: function( $scope, $element ) {
			$scope.style = $scope.style || {};
			var style = JSON.parse( JSON.stringify( $scope.style ) );
			style.background = style.background || "#ffffff", style.time = style.time || {
				line: "#646464",
				line10: "#000000",
				text: "#000000",
				thickness: .4,
				fontSize: 5,
				begin: 0
			}, style.level = style.level || {
				line: "#646464",
				text: "#000000",
				thickness: .4,
				fontSize: 5
			}, style.caption = style.caption || {
				color: "#000000",
				fontSize: 5
			}, style.thickness = $scope.thickness || .4, $scope.grid = $scope.grid || {}, $scope.sync && $scope.sync.lock(), $scope.source.get( {
				begin: $scope.grid.begin - 6e4,
				end: $scope.area.width * 6e4 / $scope.speed + $scope.grid.begin
			}, function( data ) {
				var result = window.device.bioss.angiodinfm.parse.spo2( data );
				$scope.grid.width = $scope.area.width, $scope.grid.speed = $scope.speed, $scope.grid.caption = $scope.caption, window.trendjs.spo2.print( $element, 0, $scope.grid, style, $scope.grid.begin, result ), $scope.sync && $scope.sync.unlock()
			} ), $scope.$$postDigest( function() {} )
		}
	}
} ), app.directive( "dxCtgTwoAnalyzePrint", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		transclude: !1,
		scope: {
			area: "=",
			pos: "=",
			source1: "=",
			source2: "=",
			sync: "="
		},
		template: '<div x="{{area.x}}" y="{{area.y}}" dx="{{area.width}}" dy="{{area.height}}"><hypertext css="table {width: 100%;font-size:8pt;font-family: Arial; } .ra { text-align: left;padding-right:10pt;width:40% } .analize { height:10mm} " dx="{{area.width/2}}"><table ><tr><td class="ra"><b>Название</b></td>         <td><b>ПЛ1/2</b></td>                                                                                            <td><b>Ед.изм</b></td>  <td ng-if="analyze1.AnalysisType==0"><b>Норма</b></td></tr><tr><td class="ra">Время анализа</td>           <td><b>{{MakeValue(analyze1.Params.fRecLen)}}</b></td>                                                           <td>мин</td>            <td ng-if="analyze1.AnalysisType==0">{{MakeRange(analyze1.UserCriterion.RecLen)}}</td></tr><tr><td class="ra">Процент потерь</td>          <td><b>{{MakeValue(analyze1.Params.fLP).toFixed(1)}} / {{MakeValue(analyze2.Params.fLP).toFixed(1)}}</b></td>    <td>%</td>              <td ng-if="analyze1.AnalysisType==0">{{MakeRange(analyze1.UserCriterion.LP)}}</td></tr><tr><td class="ra">Базальная ЧСС</td>           <td><b>{{MakeValue(analyze1.Params.fBR).toFixed(1)}} / {{MakeValue(analyze2.Params.fBR).toFixed(1)}}</b></td>    <td>ВРМ</td>            <td ng-if="analyze1.AnalysisType==0">{{MakeRange(analyze1.UserCriterion.BR)}}</td></tr><tr><td class="ra">Акц >15 BPM и 15 с</td>      <td><b>{{MakeValue(analyze1.Params.nAcc10)}} / {{MakeValue(analyze2.Params.nAcc10)}}</b></td>                    <td>шт</td>             <td ng-if="analyze1.AnalysisType==0">{{MakeRange(analyze1.UserCriterion.Acc10)}}</td></tr><tr><td class="ra">Дец >15 BPM и 15 с</td>      <td><b>{{MakeValue(analyze1.Params.nAcc15)}} / {{MakeValue(analyze2.Params.nAcc15)}}</b></td>                    <td>шт</td>             <td ng-if="analyze1.AnalysisType==0">{{MakeRange(analyze1.UserCriterion.Acc15)}}</td></tr><tr><td class="ra">Дец >20 ударов</td>          <td><b>{{MakeValue(analyze1.Params.nDec)}} / {{MakeValue(analyze2.Params.nDec)}}</b></td>                        <td>шт</td>             <td ng-if="analyze1.AnalysisType==0">{{MakeRange(analyze1.UserCriterion.Dec20)}}</td></tr><tr><td class="ra">Высокая вариабельность</td>  <td><b>{{MakeValue(analyze1.Params.nHV)}} / {{MakeValue(analyze2.Params.nHV)}}</b></td>                          <td>мин</td>            <td ng-if="analyze1.AnalysisType==0">{{MakeRange(analyze1.UserCriterion.HV)}}</td></tr><tr><td class="ra">Оценка КТГ</td>              <td colspan="3"><b ng-if="analyze1.AnalysisType==0"> Пользовательская</b><b ng-if="analyze1.AnalysisType==1"> Кербс-Фишер</b><b ng-if="analyze1.AnalysisType==2"> FIGO</b></td><td> </td></tr></table></hypertext><hypertext css="table {width: 100%;font-size:8pt;font-family: Arial; } .ra { text-align: left;padding-right:10pt;width:40% } .analize { height:10mm}" x="{{area.width/2}}" dx="{{area.width/2}}"><table  ><tr><td class="ra"><b>Название</b></td>         <td><b>ПЛ1/2</b></td>                                                                      <td><b>Ед.изм</b></td>  <td ng-if="analyze1.AnalysisType==0"><b>Норма</b></td></tr><tr><td class="ra">Низкая вариабельность</td>   <td><b>{{MakeValue(analyze1.Params.nLV)}} / {{MakeValue(analyze2.Params.nLV)}}</b></td>                          <td>мин</td>            <td ng-if="analyze1.AnalysisType==0">{{MakeRange(analyze1.UserCriterion.LV)}}</td></tr><tr><td class="ra">Синусоидальный ритм</td>     <td><b>{{MakeValue(analyze1.Params.nSin)}} / {{MakeValue(analyze2.Params.nSin)}}</b></td>                        <td>мин</td>            <td ng-if="analyze1.AnalysisType==0">{{MakeRange(analyze1.UserCriterion.Sin)}}</td></tr><tr><td class="ra">LTV</td>                     <td><b>{{MakeValue(analyze1.Params.fLTV).toFixed(1)}} / {{MakeValue(analyze2.Params.fLTV).toFixed(1)}}</b></td>  <td>мс</td>             <td ng-if="analyze1.AnalysisType==0">{{MakeRange(analyze1.UserCriterion.LTV)}}</td></tr><tr><td class="ra">STV</td>                     <td><b>{{MakeValue(analyze1.Params.fSTV).toFixed(1)}} / {{MakeValue(analyze2.Params.fSTV).toFixed(1)}}</b></td>  <td>мс</td>             <td ng-if="analyze1.AnalysisType==0">{{MakeRange(analyze1.UserCriterion.STV)}}</td></tr><tr><td class="ra">Частота осцилляций</td>      <td><b>{{MakeValue(analyze1.Params.fLTF).toFixed(1)}} / {{MakeValue(analyze2.Params.fLTF).toFixed(1)}}</b></td>  <td>1/мин</td>          <td ng-if="analyze1.AnalysisType==0">{{MakeRange(analyze1.UserCriterion.LTF)}}</td></tr><tr><td class="ra">Частота шевелений</td>       <td><b>{{MakeValue(analyze1.Params.fMPH).toFixed(1)}} / {{MakeValue(analyze2.Params.fMPH).toFixed(1)}}</b></td>  <td>1/час</td>          <td ng-if="analyze1.AnalysisType==0">{{MakeRange(analyze1.UserCriterion.MPH)}}</td></tr><tr><td class="ra"> &#160;</td>                 <td><b></b></td><td> </td></tr><tr ng-if="analyze1.AnalysisType==0"><td class="ra">Параметров в норме</td><td><b>{{analyze1.UserResult.nOKParams}} / {{analyze2.UserResult.nOKParams}}</b></td><td>из {{analyze1.UserResult.nTotalParams}} </td></tr><tr ng-if="analyze1.AnalysisType==1"><td class="ra"></td><td><b>{{analyze1.KrebsFischerResult.nPoints}} / {{analyze2.KrebsFischerResult.nPoints}} баллов</b></td></td></tr><tr ng-if="analyze1.AnalysisType==2"><td class="ra"></td><td><b>{{FIGOResult(analyze1.FIGOResult.Result)}} / {{FIGOResult(analyze2.FIGOResult.Result)}}</b></td></td></tr></table></hypertext></div>',
		link: function( $scope, $element ) {
			$scope.MakeRange = function( val ) {
				return val.fRangeMax != 2147483647 && val.fRangeMax != 3.4028234663852886e38 && val.fRangeMin != 2147483647 && val.fRangeMin != 3.4028234663852886e38 ? "от " + val.fRangeMin + " до " + val.fRangeMax : val.fRangeMax != 2147483647 && val.fRangeMax != 3.4028234663852886e38 || val.fRangeMin == 2147483647 || val.fRangeMin == 3.4028234663852886e38 ? val.fRangeMax == 2147483647 || val.fRangeMax == 3.4028234663852886e38 || val.fRangeMin != 2147483647 && val.fRangeMin != 3.4028234663852886e38 ? "---" : "не более " + val.fRangeMax : "не менее " + val.fRangeMin
			}, $scope.MakeValue = function( val ) {
				return val == 2147483647 ? undefined : val == 3.4028234663852886e38 ? undefined : val
			}, $scope.FIGOResult = function( val ) {
				switch ( val ) {
					case 1:
						return "Нормальная";
					case 2:
						return "Подозрительная";
					case 3:
						return "Патологическая"
				}
				return "---"
			}, $scope.sync && $scope.sync.lock(), $scope.sync && $scope.sync.lock(), $scope.source1.get( {
				end: $scope.pos,
				last: !0,
				limit: 1
			}, function( data ) {
				$scope.sync && ( $scope.$apply( function() {
					$scope.analyze1 = window.device.bioss.angiodinfm.parse.analyze( data )[ 0 ]
				} ), $scope.sync.unlock() )
			} ), $scope.source2.get( {
				end: $scope.pos,
				last: !0,
				limit: 1
			}, function( data ) {
				$scope.sync && ( $scope.$apply( function() {
					$scope.analyze2 = window.device.bioss.angiodinfm.parse.analyze( data )[ 0 ]
				} ), $scope.sync.unlock() )
			} ), $scope.$$postDigest( function() {} )
		}
	}
} ), app.directive( "dxCtgAnalyzePrint", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		transclude: !1,
		scope: {
			area: "=",
			pos: "=",
			source: "=",
			caption: "@",
			sync: "="
		},
		template: '<div x="{{area.x}}" y="{{area.y}}" dx="{{area.width}}" dy="{{area.height}}"><hypertext css="table {width: 100%;font-size:8pt;font-family: Arial; } .ra { text-align: left;padding-right:10pt;width:40% } .analize { height:10mm} " dx="{{area.width/2}}"><table ><tr><td class="ra"><b>Название</b></td>         <td><b>{{caption}}</b></td>                                       <td><b>Ед.изм</b></td>  <td ng-if="analyze.AnalysisType==0"><b>Норма</b></td></tr><tr><td class="ra">Время анализа</td>           <td><b>{{MakeValue(analyze.Params.fRecLen)}}</b></td>             <td>мин</td>            <td ng-if="analyze.AnalysisType==0">{{MakeRange(analyze.UserCriterion.RecLen)}}</td></tr><tr><td class="ra">Процент потерь</td>          <td><b>{{MakeValue(analyze.Params.fLP).toFixed(1)}} </b></td>     <td>%</td>              <td ng-if="analyze.AnalysisType==0">{{MakeRange(analyze.UserCriterion.LP)}}</td></tr><tr><td class="ra">Базальная ЧСС</td>           <td><b>{{MakeValue(analyze.Params.fBR).toFixed(1)}} </b></td>     <td>ВРМ</td>            <td ng-if="analyze.AnalysisType==0">{{MakeRange(analyze.UserCriterion.BR)}}</td></tr><tr><td class="ra">Акц >15 BPM и 15 с</td>      <td><b>{{MakeValue(analyze.Params.nAcc10)}} </b></td>             <td>шт</td>             <td ng-if="analyze.AnalysisType==0">{{MakeRange(analyze.UserCriterion.Acc10)}}</td></tr><tr><td class="ra">Дец >15 BPM и 15 с</td>      <td><b>{{MakeValue(analyze.Params.nAcc15)}} </b></td>             <td>шт</td>             <td ng-if="analyze.AnalysisType==0">{{MakeRange(analyze.UserCriterion.Acc15)}}</td></tr><tr><td class="ra">Дец >20 ударов</td>          <td><b>{{MakeValue(analyze.Params.nDec20)}} </b></td>             <td>шт</td>           <td ng-if="analyze.AnalysisType==0">{{MakeRange(analyze.UserCriterion.Dec20)}}</td></tr><tr><td class="ra">Высокая вариабельность</td>  <td><b>{{MakeValue(analyze.Params.nHV)}} </b></td>                <td>мин</td>            <td ng-if="analyze.AnalysisType==0">{{MakeRange(analyze.UserCriterion.HV)}}</td></tr><tr><td class="ra">Оценка КТГ</td>              <td colspan="3"><b ng-if="analyze.AnalysisType==0"> Пользовательская</b><b ng-if="analyze.AnalysisType==1"> Кербс-Фишер</b><b ng-if="analyze.AnalysisType==2"> FIGO</b></td><td> </td></tr></table></hypertext><hypertext css="table {width: 100%;font-size:8pt;font-family: Arial; } .ra { text-align: left;padding-right:10pt;width:40% } .analize { height:10mm}" x="{{area.width/2}}" dx="{{area.width/2}}"><table  ><tr><td class="ra"><b>Название</b></td>         <td><b>{{caption}}</b></td>                                       <td><b>Ед.изм</b></td>  <td ng-if="analyze.AnalysisType==0"><b>Норма</b></td></tr><tr><td class="ra">Низкая вариабельность</td>   <td><b>{{MakeValue(analyze.Params.nLV)}} </b></td>                <td>мин</td>            <td ng-if="analyze.AnalysisType==0">{{MakeRange(analyze.UserCriterion.LV)}}</td></tr><tr><td class="ra">Синусоидальный ритм</td>     <td><b>{{MakeValue(analyze.Params.nSin)}}</b></td>                <td>мин</td>            <td ng-if="analyze.AnalysisType==0">{{MakeRange(analyze.UserCriterion.Sin)}}</td></tr><tr><td class="ra">LTV</td>                     <td><b>{{MakeValue(analyze.Params.fLTV).toFixed(1)}} </b></td>    <td>мс</td>             <td ng-if="analyze.AnalysisType==0">{{MakeRange(analyze.UserCriterion.LTV)}}</td></tr><tr><td class="ra">STV</td>                     <td><b>{{MakeValue(analyze.Params.fSTV).toFixed(1)}} </b></td>    <td>мс</td>             <td ng-if="analyze.AnalysisType==0">{{MakeRange(analyze.UserCriterion.STV)}}</td></tr><tr><td class="ra">Частота осцилляций</td>      <td><b>{{MakeValue(analyze.Params.fLTF).toFixed(1)}} </b></td>    <td>1/мин</td>          <td ng-if="analyze.AnalysisType==0">{{MakeRange(analyze.UserCriterion.LTF)}}</td></tr><tr><td class="ra">Частота шевелений</td>       <td><b>{{MakeValue(analyze.Params.fMPH).toFixed(1)}} </b></td>    <td>1/час</td>          <td ng-if="analyze.AnalysisType==0">{{MakeRange(analyze.UserCriterion.MPH)}}</td></tr><tr><td class="ra"> &#160;</td>                 <td><b></b></td><td> </td></tr><tr ng-if="analyze.AnalysisType==0"><td class="ra">Параметров в норме</td><td><b>{{analyze.UserResult.nOKParams}}</b></td><td>из {{analyze.UserResult.nTotalParams}} </td></tr><tr ng-if="analyze.AnalysisType==1"><td class="ra"></td><td><b>{{analyze.KrebsFischerResult.nPoints}} баллов</b></td></td></tr><tr ng-if="analyze.AnalysisType==2"><td class="ra"></td><td><b>{{FIGOResult(analyze.FIGOResult.Result)}} </b></td></td></tr></table></hypertext></div>',
		link: function( $scope, $element ) {
			$scope.MakeRange = function( val ) {
				return val.fRangeMax != 2147483647 && val.fRangeMax != 3.4028234663852886e38 && val.fRangeMin != 2147483647 && val.fRangeMin != 3.4028234663852886e38 ? "от " + val.fRangeMin + " до " + val.fRangeMax : val.fRangeMax != 2147483647 && val.fRangeMax != 3.4028234663852886e38 || val.fRangeMin == 2147483647 || val.fRangeMin == 3.4028234663852886e38 ? val.fRangeMax == 2147483647 || val.fRangeMax == 3.4028234663852886e38 || val.fRangeMin != 2147483647 && val.fRangeMin != 3.4028234663852886e38 ? "---" : "не более " + val.fRangeMax : "не менее " + val.fRangeMin
			}, $scope.MakeValue = function( val ) {
				return val == 2147483647 ? undefined : val == 3.4028234663852886e38 ? undefined : val
			}, $scope.FIGOResult = function( val ) {
				switch ( val ) {
					case 1:
						return "Нормальная";
					case 2:
						return "Подозрительная";
					case 3:
						return "Патологическая"
				}
				return "---"
			}, $scope.sync && $scope.sync.lock(), $scope.source.get( {
				end: $scope.pos,
				last: !0,
				limit: 1
			}, function( data ) {
				$scope.sync && ( $scope.$apply( function() {
					$scope.analyze = window.device.bioss.angiodinfm.parse.analyze( data )[ 0 ]
				} ), $scope.sync.unlock() )
			} ), $scope.$$postDigest( function() {} )
		}
	}
} ), app.directive( "dxBiossAngiodinfmTestProperty", function( $timeout, $http, $rootScope ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			test: "="
		},
		template: '﻿<div>    <ul class="nav nav-tabs">        <li class="active"><a data-toggle="tab" href="#testPanel1">Общие</a></li>        <li><a data-toggle="tab" href="#testPanel2">Пациент</a></li>        <li><a data-toggle="tab" href="#testPanel3">Заключение</a></li>    </ul>    <div class="tab-content" style="margin-top:20px">        <div id="testPanel1" class="tab-pane fade in active">            <div class="form-horizontal" role="form">                <dx-field name="Номер" width-label="col-sm-3" width-value="col-sm-9"><input type="text" class="form-control" ng-model="test.number" readonly /></dx-field>                <dx-field name="Вид исследования" width-label="col-sm-3" width-value="col-sm-9"><input type="text" class="form-control" ng-model="test.type" readonly /></dx-field>                <dx-field name="Дата" width-label="col-sm-3" width-value="col-sm-9"><input type="text" class="form-control" value="{{helpers.JsonDateToStringDateUTCTime(test.date)}}" readonly /></dx-field>                <dx-field name="Продолжительность" width-label="col-sm-3" width-value="col-sm-9"><input type="text" class="form-control" value="{{helpers.TickToDurationString (test.additional.duration) }}" readonly /></dx-field>                <dx-field name="Срок беременности" width-label="col-sm-3" width-value="col-sm-9"><input type="text" class="form-control" value="{{termPregnancy()}}" readonly /></dx-field>                <dx-field name="Оборудование" width-label="col-sm-3" width-value="col-sm-9"><input type="text" class="form-control" value="Прикроватный монитор Ангиодин-ФМ" readonly /></dx-field>                <dx-field name="Номер монитора" width-label="col-sm-3" width-value="col-sm-9"><input type="text" class="form-control" ng-model="test.additional[\'device.number\']" readonly /></dx-field>            </div>        </div>        <div id="testPanel2" class="tab-pane fade">            <dx-patient-browse2 edit="test"></dx-patient-browse2>            <div class="form-horizontal" role="form">                <dx-field name="Страховая компания " width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="test[\'patient\'].nameInsurance" readonly /></dx-field>                <dx-field name="Номер полиса" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="test[\'patient\'].numberInsurance" readonly /></dx-field>            </div>        </div>        <div id="testPanel3" class="tab-pane fade">            <div id="conclusion"></div>        </div>    </div></div>',
		link: function( $scope, $element ) {
			$scope.root = root, $scope.helpers = helpers, $scope.$watch( "test", function( value ) {
				if ( value == undefined ) return;
				root.Api( "/Api/bioss.angiodinfm/GetData", {
					$http: $http,
					data: {
						section: [ {
							type: "conclusion",
							limit: 1,
							tick: 0
						} ],
						parser: "bioss.angiodinfm",
						uuidTest: value.uuid
					},
					success: function( result ) {
						if ( result.conclusion.length == 1 ) {
							var concl = decodeURIComponent( escape( String.fromCharCode.apply( null, result.conclusion[ 0 ].data ) ) );
							$element.find( "#conclusion" ).html( JSON.parse( concl ).text )
						} else $element.find( "#conclusion" ).html( "" )
					},
					error: function( result ) {}
				} )
			} ), $scope.termPregnancy = function() {
				var date = new Date( Date.parse( $scope.test.date ) );
				if ( $scope.test.additional.child_bd == undefined ) return "не указан";
				var term = ( ( date.getTime() - $scope.test.additional.child_bd ) / 6048e5 ).toFixed( 1 );
				return term > 50 ? "не указан" : term
			}
		}
	}
} ), app.directive( "dxBiossAngiodinfmDeviceBrowse", function( $timeout, $http ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			edit: "=",
			visibilityPlace: "=",
			visibilityClinic: "="
		},
		template: '<div class="form-horizontal" role="form"><dx-field name="Номер" width-label="col-sm-3" width-value="col-sm-9"><input type="text" class="form-control" ng-model="edit.number" ng-readonly="true"/></dx-field><dx-field name="Расположение" width-label="col-sm-3" width-value="col-sm-9" ng-if="visibilityPlace!=false"><dx-device-place-select id="edit.place" ng-readonly="true"></dx-device-place-select></dx-field><dx-field name="Вр.зона" width-label="col-sm-3" width-value="col-sm-9"><dx-time-zone-select value="edit.gmt"  ng-readonly="true"></dx-time-zone-select></dx-field><div ng-if="edit.place==\'clinic\' && visibilityPlace!=false"><dx-field name="Учреждение" width-label="col-sm-3" width-value="col-sm-9" ng-if="visibilityClinic!=false"><dx-clinic-select uuid="edit.uuidPlace"  ng-readonly="true"></dx-clinic-select></dx-field><dx-field name="Отделение" width-label="col-sm-3" width-value="col-sm-9"><dx-clinic-org-select division="edit.additional.division" uuid-clinic="edit.uuidPlace" ng-readonly="true"></dx-clinic-org-select></dx-field><dx-field name="Палата" width-label="col-sm-3" width-value="col-sm-9"><input type="text" class="form-control" ng-model="edit.additional.chamber" ng-readonly="true" /></dx-field><dx-field name="Койка" width-label="col-sm-3" width-value="col-sm-9"><input type="text" class="form-control" ng-model="edit.additional.bed"  ng-readonly="true"/></dx-field></div><div ng-if="edit.place==\'patient\' && visibilityPlace!=false"><dx-field name="Пациент" width-label="col-sm-3" width-value="col-sm-9"><dx-patient-select uuid="edit.uuidPlace" ng-readonly="true"></dx-patient-select></dx-field></div><div ng-if="edit.place==\'doctor\' && visibilityPlace!=false"><dx-field name="Врач" width-label="col-sm-3" width-value="col-sm-9"><dx-doctor-select uuid="edit.uuidPlace" ng-readonly="true"></dx-doctor-select></dx-field></div><dx-field name="Описание" width-label="col-sm-3" width-value="col-sm-9"><textarea class="form-control" style="height:100px" ng-model="edit.description" ng-readonly="true"></textarea></dx-field></div>',
		link: function( $scope, $element ) {
			$scope.root = root
		}
	}
} ), app.directive( "dxBiossAngiodinfmDeviceEdit", function( $timeout, $http, $compile ) {
	return {
		restrict: "E",
		replace: !0,
		scope: {
			edit: "=",
			visibilityPlace: "=",
			visibilityClinic: "="
		},
		template: '<div class="form-horizontal" role="form"><dx-field name="Номер" width-label="col-sm-3" width-value="col-sm-9"><input type="text" class="form-control" ng-model="edit.number" /></dx-field><dx-field name="Расположение" width-label="col-sm-3" width-value="col-sm-9" ng-if="visibilityPlace!=false"><dx-device-place-select id="edit.place" ng-readonly="false"></dx-device-place-select></dx-field><dx-field name="Вр.зона" width-label="col-sm-3" width-value="col-sm-9"><dx-time-zone-select value="edit.gmt"></dx-time-zone-select></dx-field><div ng-if="edit.place==\'clinic\' && visibilityPlace!=false"><dx-field name="Учреждение" width-label="col-sm-3" width-value="col-sm-9" ng-if="visibilityClinic!=false"><dx-clinic-select uuid="edit.uuidPlace"></dx-clinic-select></dx-field><dx-field name="Отделение" width-label="col-sm-3" width-value="col-sm-9"><dx-clinic-org-select division="edit.additional.division" uuid="edit.uuidPlace"></dx-clinic-org-select></dx-field><dx-field name="Палата" width-label="col-sm-3" width-value="col-sm-9"><input type="text" class="form-control" ng-model="edit.additional.chamber" /></dx-field><dx-field name="Койка" width-label="col-sm-3" width-value="col-sm-9"><input type="text" class="form-control" ng-model="edit.additional.bed" /></dx-field></div><div ng-if="edit.place==\'patient\' && visibilityPlace!=false"><dx-field name="Пациент" width-label="col-sm-3" width-value="col-sm-9"><dx-patient-select uuid="edit.uuidPlace"></dx-patient-select></dx-field></div><div ng-if="edit.place==\'doctor\' && visibilityPlace!=false"><dx-field name="Врач" width-label="col-sm-3" width-value="col-sm-9"><dx-doctor-select uuid="edit.uuidPlace"></dx-doctor-select></dx-field></div><dx-field name="Описание" width-label="col-sm-3" width-value="col-sm-9"><textarea class="form-control" style="height:100px" ng-model="edit.description"></textarea></dx-field><dx-field name="" width-label="col-sm-3" width-value="col-sm-9"><div class="alert alert-danger" role="alert" ng-if="error!=undefined">{{error}}</div></dx-field></div>',
		link: function( $scope, $element ) {
			function Save() {
				delete $scope.error, root.Device.Put( {
					$http: $http,
					data: $scope.edit,
					success: function( result ) {
						$scope.edit.uuid = $scope.edit.uuid || result.uuid, prev = JSON.stringify( $scope.edit )
					},
					error: function( result ) {
						prev = JSON.stringify( $scope.edit ), $scope.error = result.message
					}
				} )
			}
			$scope.title = "", $scope.root = root;
			var timerId = 0,
				prev = "";
			$scope.$watch( "edit", function( value ) {
				$timeout( function() {
					prev = JSON.stringify( $scope.edit )
				}, 1e3 )
			} ), timerId = setInterval( function() {
				$scope.edit && $scope.edit.uuid && prev.length > 0 && prev != JSON.stringify( $scope.edit ) && Save()
			}, 500 ), $scope.$on( "$destroy", function() {
				timerId != 0 && clearInterval( timerId )
			} )
		}
	}
} )