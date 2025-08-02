import { Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { AuthenticatedGuard } from '../core/guards/authenticated.guard';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => import('./shared/components/home-layout/home-layout.component').then(m => m.HomeLayoutComponent),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/components/home/home.component').then(m => m.HomeComponent),
        data: { textoLink: 'Inicio',
          incluirEn: 'MenuSup'  }
      },

      {
        path: 'eventos detalles',
        loadComponent: () => import('./features/components/eventos/eventos-view/eventos-view.component').then(m => m.EventosViewComponent),
        data: { textoLink: 'Eventos detalles ',
          incluirEn: 'MenuSup'  }
      },
      {
        path: 'login',
        loadComponent: () => import('./features/components/login/login/login.component').then(m => m.LoginComponent),
        data: { textoLink: 'Iniciar sesión',
          incluirEn: 'MenuSup'  }
      },
      {
        path: 'signup',
        loadComponent: () => import('./features/components/login/sing-up/sing-up.component').then(m => m.SingUpComponent),
        data: { textoLink: 'Registro',
                incluirEn: 'MenuSup'  }
      },
      {
        path: 'change-password',
        loadComponent: () => import('./features/components/login/change-password/change-password/change-password.component').then(m => m.ChangePasswordComponent),
                canActivate: [AuthGuard],
                data: { roles:['ADMIN', 'SECRETARIA', 'DIRECTOR', 'ESTUDIANTE', 'USER', 'WEBADMIN', 'DOCENTE'],
                        textoLink: 'Cambiar Contraseña',
                        incluirEn: 'MenuIzq'  } // Texto para el link

      },


      { path: 'carreras',
        loadComponent: () => import('./features/components/Carrera/carrera-listado/carrera-listado.component').then(m => m.CarreraListadoComponent ),
      },

       {
        path: 'noticias',
        loadComponent: () => import('./features/components/noticia/noticias-card/noticias-card.component').then(m => m.NoticiasCardComponent),
      },
      {
        path: 'noticias/:id',
        loadComponent: () => import('./features/components/noticia/noticias-card/noticias-card.component').then(m => m.NoticiasCardComponent),
      },

      {
        path: 'contacto',
        loadComponent: () => import('./features/components/home/contacto/contacto.component').then(m => m.ContactoComponent),
      },

      {
        path: 'listaeventos',
        loadComponent: () => import('./features/components/eventos/eventos-view/eventos-view.component').then(m => m.EventosViewComponent),

      },
      {
        path: 'noticiadetalle',
        loadComponent: () => import('./features/components/noticia/noticia-detalle/noticia-detalle.component').then(m => m.NoticiaDetalleComponent),

      },

      { path: 'noticiadetalle/:id',loadComponent: () => import('./features/components/noticia/noticia-detalle/noticia-detalle.component').then(m => m.NoticiaDetalleComponent),

      },

      { path: 'noticiadetalle/:id',loadComponent: () => import('./features/components/noticia/noticia-detalle/noticia-detalle.component').then(m => m.NoticiaDetalleComponent),

      },

      


      {
        path: '',
        redirectTo: 'home', pathMatch: 'full',
        data: {  textoLink: 'Inicio',
          incluirEn: 'MenuSup'  }

      },


    ]
  },
{  path: '',
  loadComponent: () => import('./shared/components/layout-institucional/layout-institucional.component').then(m => m.LayoutInstitucionalComponent),
  children: [

    { path: 'tecnicatura',
      loadComponent: () => import('./features/components/Carrera/carrera-view/carrera-tecnicatura/carrera-view.component').then(m => m.CarreraViewComponent )
    },
    { path: 'lengua',
      loadComponent: () => import('./features/components/Carrera/carrera-view/carrera-lengua/carrera-lengua.component').then(m => m.CarreraLenguaComponent )
    },
    { path: 'primaria',
      loadComponent: () => import('./features/components/Carrera/carrera-view/carrera-primaria/carrera-primaria.component').then(m => m.CarreraPrimariaComponent)
    },
    {
      path: 'tsmi',
      loadComponent: () => import('./features/components/Carrera/carrera-view/carrera-tsmi/carrera-tsmi.component').then(m => m.CarreraTsmiComponent)
    },
    {
      path: 'biologia',
      loadComponent: () => import('./features/components/Carrera/carrera-view/carrera-biologia/carrera-biologia.component').then(m => m.CarreraBiologiaComponent)
    },
    { path: 'perfil',
      loadComponent: () => import('./features/components/Carrera/info/ocupacion/ocupacion.component').then(m => m.OcupacionComponent)
    },

     { path: 'correlatividades',
      loadComponent: () => import('./features/components/Carrera/info/correlatividad-tecnicatura/correlatividad-tecnicatura.component').then(m => m.CorrelatividadTecnicaturaComponent)
    },
    { path: 'planestudio',
      loadComponent: () => import('./features/components/Carrera/info/plan-estudio/plan-estudio.component').then(m => m.PlanEstudioComponent)
    },
  ]


},
   {
    path: 'admin-dashboard',
    loadComponent: () => import('./shared/components/layout-roles/layout-admin-dashboard/layout-admin-dashboard.component').then(m => m.LayoutAdminDashboardComponent),
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'SECRETARIA', 'DIRECTOR']
    }
  },
  {
    path: 'docente-dashboard',
    loadComponent: () => import('./shared/components/layout-roles/layout-docente-dashboard/layout-docente-dashboard.component').then(m => m.LayoutDocenteDashboardComponent),
    canActivate: [AuthGuard],
    data: { roles: ['DOCENTE']
    }
  },

  {
    path: 'estudiante-dashboard',
    loadComponent: () => import('./shared/components/layout-roles/layout-alumno-dashboard/layout-alumno-dashboard.component').then(m => m.LayoutAlumnoDashboardComponent),
    canActivate: [AuthGuard],
    data: { roles: ['ESTUDIANTE']
    }
  },
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: 'students',
        loadComponent: () => import('./features/components/students/students.component').then(m => m.StudentsComponent),
        canActivate: [AuthGuard],
        data: { roles: [ 'ESTUDIANTE', 'ADMIN' ],
                textoLink: 'Estudiantes',
                incluirEn: 'MenuIzq'  } // Texto para el link
      },
      {
        path: 'preinscripcionmesa',
        loadComponent: () => import('./features/components/students/pre-inscripcion-mesa/pre-inscripcion-mesa.component').then(m => m.PreInscripcionMesaComponent),
        canActivate: [AuthGuard],
        data: { roles: ['ESTUDIANTE'],
                textoLink: 'Inscripción a Mesa de Examen',
                incluirEn: 'MenuDer'  } // Texto para el link
      },
      {
        path: 'notasMesasExaman',
        loadComponent: () => import('./features/components/students/notas-mesa-examen/notas-mesa-examen.component').then(m => m.NotasMesaExamenComponent),
        canActivate: [AuthGuard],
        data: { roles: ['ESTUDIANTE'],
                textoLink: 'Notas de Mesas de Exámen',
                incluirEn: 'MenuDer'  } // Texto para el link
      },
    {
        path: 'crearevento',
        loadComponent: () => import('./features/components/eventos/crear-evento/crear-evento.component').then(m => m.CrearEventoComponent),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'SECRETARIA','DOCENTE'],
                textoLink: 'Crear Evento' ,
                incluirEn: 'MenuDer' } // Texto para el link
      },
      {
        path: 'imprimirActaMesaExamen',
        loadComponent: () => import('./features/components/administration/imprimir-acta-mesa/imprimir-acta-mesa.component').then(m => m.ImprimirActaMesaComponent),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'SECRETARIA','JEFE_SECCION'],
                textoLink: 'Imprimir Acta Mesa Exámen' ,
                 } // Texto para el link
      },
      {
        path: 'imprimirListaInsc',
        loadComponent: () => import('./features/components/administration/imprimir-lista-insc/imprimir-lista-insc.component').then(m => m.ImprimirListaInscComponent),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'],
                textoLink: 'Imprimir Lista Inscriptos Mesas Examen' ,

                 } // Texto para el link
      },
      {
        path: 'crearevento',
        loadComponent: () => import('./features/components/eventos/crear-evento/crear-evento.component').then(m => m.CrearEventoComponent),
        canActivate: [AuthGuard],
        data: { roles:  ['ADMIN', 'JEFE_SECCION', 'SECRETARIA', 'DIRECTOR', 'DOCENTE', 'WEBADMIN', 'USER'],
                textoLink: 'Evento' ,
                incluirEn: 'MenuSup' } // CAMBIAR LA RUTA AL CREARLA
      },
      {
        path: 'cargarNotasMesa',
        loadComponent: () => import('./features/components/teachers/notas-mesa-examen/notas-mesa-examen.component').then(m => m.NotasMesaExamenComponent),
        canActivate: [AuthGuard],
        data: { roles: ['DOCENTE'],
                textoLink: 'Cargar Notas de Mesas de Exámen',
                incluirEn: 'MenuDer'  } // Texto para el link
      },
      {
        path: 'listaAlumno',
        loadComponent: () => import('./features/components/administration/lista-alumnos/lista-alumnos.component').then(m => m.ListaAlumnosComponent),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'JEFE_SECCION', 'SECRETARIA', 'DIRECTOR', 'DOCENTE'],
                textoLink: 'Lista de Alumnos',
                  } // Texto para el link
      },

      {
        path: 'listainscriptos',
        loadComponent: () => import('./features/components/administration/list-inscriptos/list-inscriptos.component').then(m => m.ListInscriptosComponent),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'SECRETARIA'],
                textoLink: 'Inscriptos a Mesas de examen',
                incluirEn: 'MenuDer'  } // Texto para el link
      },
      {
        path: 'listainscriptosaprobados',
        loadComponent: () => import('./features/components/administration/inscriptos-aprovados/inscriptos-aprovados.component').then(m => m.InscriptosAprovadosComponent),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'SECRETARIA', '  JEFE_SECCION', 'DOCENTE'],
                textoLink: 'Inscriptos Aprobados',
                incluirEn: 'MenuDer'  } // Texto para el link
      },
       {
        path: 'agregarmesaexamen',
        loadComponent: () => import('./features/components/administration/mesas-examen/mesas-examen.component').then(m => m.MesasExamenComponent),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'JEFE_SECCION', 'SECRETARIA', 'DIRECTOR'],
                textoLink: 'Agregar Mesa de Examen',
                incluirEn: 'MenuDer'  } // Texto para el link
      },
      {
        path: 'agregarmesaexamen/:id',
        loadComponent: () => import('./features/components/administration/mesas-examen/mesas-examen.component').then(m => m.MesasExamenComponent),
        canActivate: [AuthGuard],
        data: {
          roles: ['ADMIN', 'JEFE_SECCION', 'SECRETARIA', 'DIRECTOR'],
          textoLink: 'Editar Mesa de Examen',
          incluirEn: 'MenuDer'
        } // Texto para el link
      },

      {
        path: 'crearturno',
        loadComponent: () => import('./features/components/administration/mesas/mesas.component').then(m => m.MesasComponent),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'JEFE_SECCION', 'SECRETARIA', 'DIRECTOR'],
          textoLink: 'Crear Turno de Examen',
          incluirEn: 'MenuDer'}

      },
      {
        path: 'crearturno/:id',
        loadComponent: () => import('./features/components/administration/mesas/mesas.component').then(m => m.MesasComponent),
        canActivate: [AuthGuard],
        data: {
          roles: ['ADMIN', 'JEFE_SECCION', 'SECRETARIA', 'DIRECTOR'],
          textoLink: 'Editar Turno de Examen',
          incluirEn: 'MenuDer'
        }

      },
      {
        path: 'listaturnos',
        loadComponent: () => import('./features/components/administration/lista-turnos/lista-turnos.component').then(m => m.ListaTurnosComponent),
        canActivate: [AuthGuard],
        data: {
          roles: ['ADMIN', 'JEFE_SECCION', 'SECRETARIA', 'DIRECTOR', 'DOCENTE', 'WEBADMIN', 'USER'],
          textoLink: 'Lista de Turnos',
          incluirEn: 'MenuDer'
        }
      },
      {
        path: 'listaturnos-students',
        loadComponent: () => import('./features/components/administration/lista-turnos-students/lista-turnos-students.component').then(m => m.ListaTurnosStudentsComponent),
        canActivate: [AuthGuard],
        data: {
          roles: ['ESTUDIANTE'],
          textoLink: 'Lista de Turnos',
          incluirEn: 'MenuDer'
        }
      },
      { path: 'carreraslista',
        loadComponent: () => import('./features/components/Carrera/carrera-listado/carrera-listado.component').then(m => m.CarreraListadoComponent ),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'JEFE_SECCION', 'SECRETARIA', 'DIRECTOR', 'DOCENTE', 'ESTUDIANTE', 'WEBADMIN', 'USER'] ,
          textoLink: 'Carreras',
          incluirEn: 'MenuIzq' }
      },
      { path: 'carreranew',
        loadComponent: () => import('./features/components/Carrera/carrera-registro/carrera-registro.component').then(m => m.CarreraRegistroComponent),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'SECRETARIA', 'DIRECTOR'],
          textoLink: 'Crear Carrera',
          incluirEn: 'MenuDer'  }
      },

      { path: 'noticianew',
        loadComponent: () => import('./features/components/noticia/noticia.component').then(m => m.NoticiaComponent),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'SECRETARIA', 'DIRECTOR'],
          textoLink: 'Crear Noticia',
          incluirEn: 'MenuDer'  }
      },

      {
        path: 'editar-noticia/:id',
        loadComponent: () => import('./features/components/noticia/noticia.component').then(m => m.NoticiaComponent),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN','SECRETARIA', 'DIRECTOR'], textoLink: 'Editar Noticia'}
      },

      { path: 'carreras/:id/edit',loadComponent: () => import('./features/components/Carrera/carrera-registro/carrera-registro.component').then(m => m.CarreraRegistroComponent),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'SECRETARIA', 'DIRECTOR'] ,
          textoLink: 'Editar Carrera',
          incluirEn: 'MenuDer' }

      },
      {
        path: 'mesaexamendisponibles', //por alumno
        loadComponent: () => import('./features/components/students/lista-mesa-examen-disponibles/lista-mesa-examen.component').then(m => m.ListaMesaExamenComponent),
        canActivate: [AuthGuard],
        data: { roles: ['ESTUDIANTE'],
          textoLink: 'Lista de Mesas de Examen',
            }
      },
      {
        path: 'mismesasalumno', // mesas de examen inscriptas (alumno)
          loadComponent: () => import('./features/components/students/mis-mesas-examen/mis-mesas-examen.component').then(m => m.MisMesasExamenComponent),
        canActivate: [AuthGuard],
        data: { roles: ['ESTUDIANTE'],
          textoLink: 'Mis mesas de examen',
          incluirEn: 'MenuDer'
            }
      },
      {
        path: 'mesaexamentribunal', //por profesor
        loadComponent: () => import('./features/components/teachers/mesas-examen-tribunal/mesas-examen-tribunal.component').then(m => m.MesasExamenTribunalComponent),
        canActivate: [AuthGuard],
        data: { roles: ['DOCENTE'],
          textoLink: 'Mis mesas de examen',
          incluirEn: 'MenuDer'
            }
      },

      {
        path: 'listamesaexamen',
        loadComponent: () => import('./features/components/administration/lista-mesa-examen/lista-mesa-examen.component').then(m => m.ListaMesaExamenComponent),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'JEFE_SECCION', 'SECRETARIA', 'DIRECTOR', 'DOCENTE', 'WEBADMIN', 'USER'],
          textoLink: 'Lista de Mesas de Examen',
            }
      },
      {
        path: 'noticias',
        loadComponent: () => import('./features/components/noticia/noticias-card/noticias-card.component').then(m => m.NoticiasCardComponent),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'JEFE_SECCION', 'SECRETARIA', 'DIRECTOR', 'DOCENTE', 'ESTUDIANTE', 'WEBADMIN', 'USER'],
          textoLink: 'Noticias'}
      },
      {
        path: 'listanotificaciones',
        loadComponent: () => import('./features/components/notificaciones-listado/notificaciones-listado.component').then(m => m.NotificacionesListadoComponent),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'JEFE_SECCION', 'SECRETARIA', 'DIRECTOR', 'DOCENTE', 'ESTUDIANTE', 'WEBADMIN', 'USER'],
          textoLink: 'Notificaciones',
          incluirEn: 'MenuIzq'  }
      },

    ]
  },



  {
    path: '**', // si es ruta que no existe
    redirectTo: 'home',
    data: {  textoLink: 'Inicio',
      incluirEn: 'MenuSup'  }
  },

];
