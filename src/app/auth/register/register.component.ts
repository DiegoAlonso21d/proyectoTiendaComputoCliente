import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from 'src/app/global.constans';
import { SnackbarService } from 'src/app/services/snackbard/snackbar.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  password = true;
  confirmPassword = true;

  registerForm: any = FormGroup;

  responseMessage: any;

  formularioCompletado: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuariosService,
    private snackbarService: SnackbarService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nombres: [null, [Validators.required]],
      email: [null, [Validators.required]],

      telefono: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  handleSubmit() {
    if (!this.registerForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Campos inválidos',
        text: 'Por favor, completa todos los campos correctamente.',
      });

      return;
    }

    var formData = this.registerForm.value;

    var data = {
      nombres: formData.nombres,
      email: formData.email,
      telefono: formData.telefono,
      password: formData.password,
    };

    this.formularioCompletado = true;

    this.usuarioService.signup(data).subscribe(
      (response: any) => {
        console.log(response);

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Registro exitoso.',
        });

        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error.error);
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }

        this.snackbarService.showSnackbar(
          error.error.messag,
          GlobalConstants.error
        );
      }
    );
    /*   } else {


      Swal.fire({
        icon: 'error',
        title: 'Campos inválidos',
        text: 'Por favor, completa todos los campos correctamente.',
      });
    } */
  }
}
