System.register(['@angular/router', './app.login.component', './app.content.component', './app.signup.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, app_login_component_1, app_content_component_1, app_signup_component_1;
    var appRoutes, routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_login_component_1_1) {
                app_login_component_1 = app_login_component_1_1;
            },
            function (app_content_component_1_1) {
                app_content_component_1 = app_content_component_1_1;
            },
            function (app_signup_component_1_1) {
                app_signup_component_1 = app_signup_component_1_1;
            }],
        execute: function() {
            appRoutes = [
                // { path: 'main', component: contentComponent, canActivate: [AuthGuard]},
                { path: 'main', component: app_content_component_1.contentComponent },
                { path: '', redirectTo: '/main', pathMatch: 'full' },
                { path: 'login', component: app_login_component_1.loginComponent },
                { path: 'signup', component: app_signup_component_1.signupComponent },
                { path: '**', redirectTo: '' }
            ];
            exports_1("routing", routing = router_1.RouterModule.forRoot(appRoutes));
        }
    }
});
