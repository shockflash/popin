from popin.shortcuts import render_to_popin, redirect_popin

def direct_popin_to_template(request, template = 'page1.html'):
    return render_to_popin(template)